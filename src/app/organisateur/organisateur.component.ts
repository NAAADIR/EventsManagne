import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-organisateur',
  templateUrl: './organisateur.component.html',
  styleUrls: ['./organisateur.component.css']
})
export class OrganisateurComponent {
  typeEvenement: string = "";
  description: string = "";
  photos: string = "";
  date: Date = new Date();
  message: string = '';

  constructor(private db: AngularFirestore) { }

  creerEvenement() {
    const evenement = {
      typeEvenement: this.typeEvenement,
      description: this.description,
      photos: this.photos,
      date: this.date,
    };

    this.db.collection('evenements').add(evenement);
    this.message = 'L\'événement a été créé avec succès.';
  }
}
