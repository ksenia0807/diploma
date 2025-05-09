import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientMainPageComponent } from "./components/client-main-page/client-main-page.component";
import { SpecialistMainPageComponent } from "./components/specialist-main-page/specialist-main-page.component";
import { AuthPageComponent } from "./components/auth-page/auth-page.component";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientMainPageComponent,
    SpecialistMainPageComponent,
    AuthPageComponent
],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
