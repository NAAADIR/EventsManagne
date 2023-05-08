import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { NbAuthService } from '@nebular/auth';


interface Evenement {
  id : string
  date:string;
  description : string;
  photos: string;
  typeEvenement: string;
  participants: string[];
  nombreParticipants: number;
}
@Component({
  selector: 'app-evenementsparticipe',
  templateUrl: './evenementsparticipe.component.html',
  styleUrls: ['./evenementsparticipe.component.css']
})

export class  EvenementsParticipeComponent {
  evenementsCollection: AngularFirestoreCollection<Evenement>;
  evenements: Observable<Evenement[]>;
  selectedDate: Date = new Date();
  userId: string = "";
  constructor(private afs: AngularFirestore, public authService: NbAuthService) {
    this.evenementsCollection = afs.collection<Evenement>('evenements');
    this.evenements = this.evenementsCollection.valueChanges();
  }


  

getEvenementsParticipe () {
  this.authService.getToken().subscribe((token) => {
    const userId = token.getPayload().sub;
    if (!userId) {
      console.error("Impossible de récupérer l'identifiant de l'utilisateur connecté");
      return;
    }
    this.evenements = this.afs.collection<Evenement>('evenements', ref =>
      ref.where('participants', 'array-contains', userId)
    ).valueChanges({idField:'id'});
    
      });
}
  
  
  

}


