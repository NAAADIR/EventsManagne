import { Component, OnInit } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isAdmin = false;

  constructor(public authService: NbAuthService, public db: AngularFirestore) { }

  ngOnInit() {
    this.authService.onTokenChange().subscribe((token) => {
      if (token.isValid()) {
        const uid = token.getPayload().sub;
        console.log('User ID:', uid);
        this.db.collection('users', ref => ref.where('id', '==', uid)).get().toPromise().then((querySnapshot) => {
          if (!querySnapshot?.empty) {
            const doc = querySnapshot?.docs[0];
            console.log('Document ID:', doc?.id);
            this.isAdmin = true;
            console.log('isAdmin', this.isAdmin);
          }
        });
      }
    });
  }
}
