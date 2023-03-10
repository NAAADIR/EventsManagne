import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';



interface Evenement {
  date: string;
  description: string;
  photos: string;
  typeEvenement: string;

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


  constructor(private afs: AngularFirestore) {
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
    // Ajouter le visiteur à la liste des participants
    // Mettre à jour le nombre de participants dans Firebase
    // Ajouter une notification pour l'organisateur
  }
}
