import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialistDetailComponent } from './components/client-main-page/feed/specialist-card/specialist-detail/specialist-detail.component';
import { ClientMainPageComponent } from './components/client-main-page/client-main-page.component';
import { ClientProfilePageComponent } from './components/client-profile-page/client-profile-page.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { AuthGuard } from './services/auth.guard';
import { SpecialistProfilePageComponent } from './components/specilaist-profile-page/specialist-profile-page.component';
import { SpecialistMainPageComponent } from './components/specialist-main-page/specialist-main-page.component';
import { SpecialistReviewsComponent } from './components/specialist-reviews/specialist-reviews.component';

const routes: Routes = [
  // { path: 'login', component: AuthPageComponent },
  // { path: 'profile', component: ClientProfilePageComponent, canActivate: [AuthGuard] },
  // { path: '', redirectTo: 'profile', pathMatch: 'full' }

  // { path: '', component: ClientMainPageComponent },
  { path: '', component: SpecialistMainPageComponent },
  { path: 'client/:id', component: ClientProfilePageComponent },
  { path: 'specialist-profile/:id', component: SpecialistProfilePageComponent },
  { path: 'specialist-reviews/:id', component: SpecialistReviewsComponent },
  { path: 'specialist/:id', component: SpecialistDetailComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
