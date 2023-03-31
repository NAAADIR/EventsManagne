import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { OrganisateurComponent } from './organisateur/organisateur.component';
import { VisiteurComponent } from './visiteur/visiteur.component';
import { AddevenementComponent } from './addevenement/addevenement.component';
import { UpdateevenementComponent } from './updateevenement/updateevenement.component';

const routes: Routes = [
  { path: 'organisateur', component: OrganisateurComponent },
  { path: 'visiteur', component: VisiteurComponent },
  { path: 'addevenement', component: AddevenementComponent },
  { path: 'updateevenement', component: UpdateevenementComponent },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
