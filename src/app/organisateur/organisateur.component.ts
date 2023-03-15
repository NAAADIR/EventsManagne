import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-organisateur',
  templateUrl: './organisateur.component.html',
  styleUrls: ['./organisateur.component.css']
})
export class OrganisateurComponent implements OnInit {

  evenementsCollection: AngularFirestoreCollection<any> | null = null;
  evenements: Observable<any[]> | null = null;

  typeEvenement: string = '';
  description: string = '';
  photos: string = '';
  date: Date = new Date();
  message: string = '';

  evenementSelectionne: any = null;
  evenementModifie: any = null;

  constructor(public db: AngularFirestore) { }

  ngOnInit() {
    this.evenementsCollection = this.db.collection('evenements');
    this.evenements = this.evenementsCollection.valueChanges();
  }

  creerEvenement() {
    const evenement = {
      typeEvenement: this.typeEvenement,
      description: this.description,
      photos: this.photos,
      date: new Date(this.date),
    };

    if (!this.typeEvenement || !this.description || !this.date || !this.photos) {
      this.message = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    if (this.evenementsCollection) {
      this.evenementsCollection.add(evenement);
      this.message = 'L\'événement a été créé avec succès.';
      this.resetFormulaire();
    } else {
      console.error("Erreur dans la requête.");
    }
  }

  modifierEvenement(evenement: any) {
    this.evenementSelectionne = evenement;
    this.evenementModifie = {
      typeEvenement: evenement.typeEvenement,
      description: evenement.description,
      photos: evenement.photos,
      date: evenement.date,
    };
  }

  enregistrerModification(typeEvenement: string) {
    if (this.evenementsCollection && this.evenementModifie) {
      this.evenementsCollection.ref.where("typeEvenement", "==", typeEvenement)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update(this.evenementModifie);
          });
          this.evenementSelectionne = null;
          this.evenementModifie = null;
          this.message = `L'évenement a été modifié avec succès.`;
        })
        .catch(error => {
          console.error("Erreur lors de la modification des événements :", error);
        });
    } else {
      console.error("Erreur dans la requête.");
    }
  }


  annulerModification() {
    this.evenementSelectionne = null;
    this.evenementModifie = null;
  }

  supprimerEvenement(typeEvenement: string) {
    if (this.evenementsCollection) {
      this.evenementsCollection.ref.where("typeEvenement", "==", typeEvenement)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
          });
          this.message = `L'évenement a été supprimé avec succès..`;
        })
        .catch(error => {
          console.error("Erreur lors de la suppression des événements :", error);
        });
    } else {
      console.error("Erreur dans la requête.");
    }
  }



  resetFormulaire() {
    this.typeEvenement = '';
    this.description = '';
    this.photos = '';
    this.date = new Date();
  }

}
