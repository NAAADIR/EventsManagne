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

  participer(evenement: any) {
    if (!evenement) {
      console.error('Evenement est null ou undefined');
      return;
    }
    this.authService.getToken().subscribe(token => {
      if (token.isValid()) {
        // Ajouter l'UID de l'utilisateur à la liste des participants
        const currentUserUid = token.getPayload().sub;
        evenement.participants.push(currentUserUid);

        // Mettre à jour le nombre de participants dans Firebase
        const evenementDoc = this.afs.collection('evenements').doc(evenement.id);
        evenementDoc.update({
          participants: evenement.participants,
          nombreParticipants: evenement.participants.length
        }).then(() => {
          console.log('Le visiteur a été ajouté à la liste des participants.');
        }).catch(error => {
          console.error('Une erreur est survenue lors de la mise à jour des participants :', error);
        });
      } else {
        console.error('Le token d\'authentification n\'est pas valide.');
      }
    });
  }

}


