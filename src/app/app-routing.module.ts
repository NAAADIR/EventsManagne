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

export function onLogout() {
  window.location.href = '/auth/login';
}

const routes: Routes = [
  { path: 'organisateur', component: OrganisateurComponent },
  { path: 'visiteur', component: VisiteurComponent },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      { path: '', component: NbLoginComponent },
      { path: 'login', component: NbLoginComponent },
      { path: 'register', component: NbRegisterComponent },
      { path: 'logout', component: NbLogoutComponent, resolve: { onLogout } },
      { path: 'request-password', component: NbRequestPasswordComponent },
      { path: 'reset-password', component: NbResetPasswordComponent },
    ],
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }, // Redirection vers la page de connexion
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
