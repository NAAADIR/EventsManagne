import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';


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

  constructor(private db: AngularFireDatabase) { }

  creerEvenement() {
    const evenement = {
      typeEvenement: this.typeEvenement,
      description: this.description,
      photos: this.photos,
      date: this.date.getTime(),
    };

    this.db.list('evenements').push(evenement);
    this.message = 'L\'événement a été créé avec succès.';
  }
}
