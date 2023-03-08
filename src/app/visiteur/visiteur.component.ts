import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-visiteur',
  templateUrl: './visiteur.component.html',
  styleUrls: ['./visiteur.component.css']
})
export class VisiteurComponent {
  evenementsRef: AngularFireList<any>;
  evenements: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.evenementsRef = db.list('evenements');
    this.evenements = this.evenementsRef.valueChanges();
  }

  participer(evenement: any) {
    // Ajouter le visiteur à la liste des participants
    // Mettre à jour le nombre de participants dans Firebase
    // Ajouter une notification pour l'organisateur
  }
}
