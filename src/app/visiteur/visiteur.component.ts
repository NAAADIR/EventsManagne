import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { NbAuthService } from '@nebular/auth';


interface Evenement {
  date:string;
  description : string;
  photos: string;
  typeEvenement: string;
  participants: string[];
  nombreParticipants: number;
}
@Component({
  selector: 'app-visiteur',
  templateUrl: './visiteur.component.html',
  styleUrls: ['./visiteur.component.css']
})

export class VisiteurComponent {
  evenementsCollection: AngularFirestoreCollection<Evenement>;
  evenements: Observable<Evenement[]>;
  selectedDate: Date = new Date();

  constructor(private afs: AngularFirestore, public authService: NbAuthService) {
    this.evenementsCollection = afs.collection<Evenement>('evenements');
    this.evenements = this.evenementsCollection.valueChanges();
  }

  getEvenements() {
    const selectedDateStr = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US');
    this.evenements = this.afs.collection<Evenement>('evenements', ref =>
      ref.where('date', '==', selectedDateStr)
    ).valueChanges();
  }

  participer(typeEvenement: string) {
    // Vérifier si l'utilisateur est connecté
    if (!this.authService.isAuthenticated()) {
      console.error("L'utilisateur n'est pas connecté");
      return;
    }
  
    this.authService.getToken().subscribe((token) => {
      const userId = token.getPayload().sub;
      if (!userId) {
        console.error("Impossible de récupérer l'identifiant de l'utilisateur connecté");
        return;
      }
  
      // Récupérer le document contenant l'événement avec le typeEvenement donné
      this.afs.collection<Evenement>('evenements', ref =>
        ref.where('typeEvenement', '==', typeEvenement)
      ).get().subscribe((querySnapshot) => {
        // Vérifier qu'un document a été trouvé
        if (querySnapshot.docs.length === 0) {
          console.warn(`Aucun événement trouvé pour le type ${typeEvenement}`);
          return;
        }
  
        // Mettre à jour le premier document trouvé avec le nouvel utilisateur
        const evenement = querySnapshot.docs[0].data() as Evenement;
        if (!evenement.participants) {
          console.warn("La liste des participants n'a pas été initialisée");
          evenement.participants = [];
        }
        if (evenement.participants.includes(userId)) {
          console.warn("L'utilisateur est déjà inscrit à cet événement");
          return;
        }
        evenement.participants.push(userId);
        evenement.nombreParticipants = evenement.participants.length;
  
        // Mettre à jour le document dans Firestore
        this.afs.collection<Evenement>('evenements').doc(querySnapshot.docs[0].id).update(evenement)
          .then(() => {
            console.log("L'événement a été mis à jour avec succès");
          })
          .catch((error) => {
            console.error("Une erreur s'est produite lors de la mise à jour de l'événement :", error);
          });
      });
    });
  }
  
  
  

}


