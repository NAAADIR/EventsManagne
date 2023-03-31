import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { OrganisateurComponent } from './organisateur/organisateur.component';

import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { VisiteurComponent } from './visiteur/visiteur.component';
import { HttpClientModule } from '@angular/common/http';
import {
  NbAuthModule,
} from '@nebular/auth';
import { NbDatepickerModule, NbIconModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AddevenementComponent } from './addevenement/addevenement.component';
import { UpdateevenementComponent } from './updateevenement/updateevenement.component';
import { NbFirebasePasswordStrategy } from '@nebular/firebase-auth';
import { NbFirebaseAuthModule } from '@nebular/firebase-auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    OrganisateurComponent,
    VisiteurComponent,
    AddevenementComponent,
    UpdateevenementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    NbDatepickerModule.forRoot(),
    FormsModule,
    RouterModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbIconModule,
    NbAuthModule,
    NbFirebaseAuthModule,
    NbEvaIconsModule,
    HttpClientModule,
    NbAuthModule.forRoot({
      strategies: [
        NbFirebasePasswordStrategy.setup({
          name: 'password',
          login: { redirect: { success: '/visiteur', failure: null } },
        }),
      ],
      forms: {
        login: {
          strategy: 'password',
          rememberMe: true,
          socialLinks: [],
        },
        register: {
          strategy: 'password',
          terms: true,
          socialLinks: [],
        },
        logout: {
          strategy: 'password',
        },
        requestPassword: {
          strategy: 'password',
          socialLinks: [],
        },
        resetPassword: {
          strategy: 'password',
          socialLinks: [],
        },
        validation: {
          password: {
            required: true,
            minLength: 6,
            maxLength: 50,
          },
          email: {
            required: true,
          },
          fullName: {
            required: false,
            minLength: 4,
            maxLength: 50,
          },
        },
      },
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
