import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';


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
    ButtonModule
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {

  public readonly login: string | undefined;

  public readonly password: string | undefined;
  
}
