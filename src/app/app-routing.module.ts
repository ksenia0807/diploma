import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialistDetailComponent } from './components/client-main-page/feed/specialist-card/specialist-detail/specialist-detail.component';
import { ClientMainPageComponent } from './components/client-main-page/client-main-page.component';
import { ClientProfilePageComponent } from './components/client-profile-page/client-profile-page.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  // { path: 'login', component: AuthPageComponent },
  // { path: 'profile', component: ClientProfilePageComponent, canActivate: [AuthGuard] },
  // { path: '', redirectTo: 'profile', pathMatch: 'full' }
  { path: '', component: ClientMainPageComponent },
  { path: 'user/:id', component: ClientProfilePageComponent },
  { path: 'specialist/:id', component: SpecialistDetailComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
