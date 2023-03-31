import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from "@angular/router";

interface Evenement {
  date:string;
  description : string;
  photos:string;
  typeEvenement: string;
}

@Component({
  selector: 'app-addevenement',
  templateUrl: './addevenement.component.html',
  styleUrls: ['./addevenement.component.css']
})
export class AddevenementComponent implements OnInit {

  typeEvenement: string = "";
  description: string = "";
  photos: string = "";
  date: Date = new Date();
  message: string = '';
  evenementsCollection: AngularFirestoreCollection<Evenement>;
  evenements: Observable<Evenement[]>;
  constructor(private afs: AngularFirestore) { 
    this.evenementsCollection = afs.collection<Evenement>('evenements');
    this.evenements = this.evenementsCollection.valueChanges();


  }

  ngOnInit(): void {
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
}
