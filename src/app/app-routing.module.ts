import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialistDetailComponent } from './components/client-main-page/feed/specialist-card/specialist-detail/specialist-detail.component';
import { ClientMainPageComponent } from './components/client-main-page/client-main-page.component';
import { ClientProfilePageComponent } from './components/client-profile-page/client-profile-page.component';

const routes: Routes = [
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
