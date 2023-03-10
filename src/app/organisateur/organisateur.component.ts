import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-organisateur',
  templateUrl: './organisateur.component.html',
  styleUrls: ['./organisateur.component.css']
})
export class OrganisateurComponent {
  evenementsCollection: AngularFirestoreCollection<any> | null = null;
  evenements: Observable<any[]> | null = null;

  typeEvenement: string = "";
  description: string = "";
  photos: string = "";
  date: Date = new Date();
  message: string = '';

  evenementSelectionne: any = null;
  evenementModifie: any = null;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.evenementsCollection = this.db.collection('evenements');
    this.evenements = this.evenementsCollection.valueChanges();
  }

  creerEvenement() {
    const evenement = {
      typeEvenement: this.typeEvenement,
      description: this.description,
      photos: this.photos,
      date: this.date,
    };

    if (this.evenementsCollection) {
      this.evenementsCollection.add(evenement);
      this.message = 'L\'événement a été créé avec succès.';
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

  enregistrerModification() {
    this.evenementsCollection!.doc(this.evenementSelectionne.id).update(this.evenementModifie);
    this.evenementSelectionne = null;
    this.evenementModifie = null;
  }

  annulerModification() {
    this.evenementSelectionne = null;
    this.evenementModifie = null;
  }

  supprimerEvenement(evenement: any) {
    this.evenementsCollection!.doc(evenement.id).delete();
  }
}