import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";

interface Evenement {
  id:string;
  date:string;
  description : string;
  photos:string;
  typeEvenement: string;
}
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
  evenementsCollection: AngularFirestoreCollection<Evenement>;
  evenements: Observable<Evenement[]>;
  id: string = "";

  constructor(private afs: AngularFirestore, private router: ActivatedRoute) {
    this.evenementsCollection = afs.collection<Evenement>('evenements');
    this.evenements = this.evenementsCollection.valueChanges();
    this.id = this.router.snapshot.params['id'];
   }

  creerEvenement() {
    const evenement = {
      typeEvenement: this.typeEvenement,
      description: this.description,
      photos: this.photos,
      date: this.date,
    };

    this.afs.collection('evenements').add(evenement);
    this.message = 'L\'événement a été créé avec succès.';
  }
  modifierEvenement() {

    
    this.message = 'L\'événement a été créé avec succès.';
  }
}
