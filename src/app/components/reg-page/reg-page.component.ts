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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-reg-page',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule,
    RadioButtonModule,
    ToastModule
  ],
  templateUrl: './reg-page.component.html',
  styleUrl: './reg-page.component.scss',
  providers: [MessageService]
})
export class RegPageComponent {

  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private clientProfileService: ClientProfileService,
    private messageService: MessageService
  ) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Пароли не совпадают'
      });
      return;
    }

    const newClient: Client = {
      id: this.generateId(), 
      avatar: ['assets/default-avatar.jpg'], 
      email: this.email,
      phone: '', 
      login: this.username,
      password: this.password
    };

    this.clientProfileService.addClient(newClient).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Успех',
          detail: 'Регистрация прошла успешно'
        });
        this.router.navigate(['/auth']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Произошла ошибка при регистрации'
        });
      }
    });
  }

  private generateId(): number {
    return Math.floor(Math.random() * 100);
  }


  authorization() {
    this.router.navigate(['/auth']);
  }
}
