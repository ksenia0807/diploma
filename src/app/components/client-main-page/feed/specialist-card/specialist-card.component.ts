import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-specialist-card',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './specialist-card.component.html',
  styleUrl: './specialist-card.component.scss'
})
export class SpecialistCardComponent {

  public readonly rating = [4.7, 5, 4.9, 3.8]

}
