import { Component, OnInit } from '@angular/core';


interface Evenement {
  date:string;
  description : string;
  photos:string;
  typeEvenement: string;
}

@Component({
  selector: 'app-updateevenement',
  templateUrl: './updateevenement.component.html',
  styleUrls: ['./updateevenement.component.css']
})
export class UpdateevenementComponent implements OnInit {

  typeEvenement: string = "";
  description: string = "";
  photos: string = "";
  date: Date = new Date();
  message: string = '';
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  modifierEvenement() {

    
    
  }
}
