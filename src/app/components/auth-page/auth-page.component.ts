import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Client } from 'src/app/models/client.model';
import { SpecialistProfileService } from 'src/app/services/specialist-profile.service';
import { Specialist } from 'src/app/models/specialist.model';
import { ClientProfileService } from 'src/app/services/client-profile.service';


@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule,
    RadioButtonModule
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent implements OnInit{

  public username = '';
  public password = '';
  public role: 'client' | 'specialist' = 'client';
  public clients: Client[] = [];
  public specialists: Specialist[] = [];

  constructor(
    private auth: AuthService, 
    private router: Router,
    private specialistProfileService: SpecialistProfileService,
    private clientProfileService: ClientProfileService,
  ) {}

  public onSubmit() {
    if (this.role === 'client') {
      this.authenticateClient();
    } else {
      this.authenticateSpecialist();
    }
  }

  ngOnInit() {
    this.specialistProfileService.getSpecialistProfiles().subscribe(data => this.specialists = data);
    this.clientProfileService.getClients().subscribe(data => this.clients = data);
  }

  private authenticateClient() {
    const client = this.clients.find(
      c => c.login === this.username && c.password === this.password
    );

    if (client) {
      this.router.navigate(['/client-page', client.id]);
    } else {
      alert('Неверный логин или пароль');
    }
  }

  private authenticateSpecialist() {
    const specialist = this.specialists.find(
      s => s.login === this.username && s.password === this.password
    );

    if (specialist) {
      this.router.navigate(['/specialist-page', specialist.id]);
    } else {
      alert('Неверный логин или пароль');
    }
  }
  
}
