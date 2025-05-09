import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SpecialistDetailComponent } from "./specialist-detail/specialist-detail.component";

@Component({
  selector: 'app-specialist-card',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    SpecialistDetailComponent
],
  templateUrl: './specialist-card.component.html',
  styleUrl: './specialist-card.component.scss'
})
export class SpecialistCardComponent {

  public readonly rating = [4.7, 5, 4.9, 3.8]

  public dialogVisible = false;
  public selectedSpecialist: any = null;

  public readonly specialists = [
    {
      title: 'Услуги сантехника',
      rating: 4.9,
      photos: [
        'assets/man.jpg',
        'assets/2.jpg',
        'assets/3.jpg'
      ],
      shortDescription: 'Я мастер с опытом работы более 8 лет, специализирующийся на установке и ремонте водопроводных и отопительных систем. Выполняю работы любой сложности, гарантирую качество и аккуратность.',
      fullDescription: 'Я мастер с опытом работы более 8 лет, специализирующийся на установке и ремонте водопроводных и отопительных систем. Выполняю работы любой сложности, гарантирую качество и аккуратность.',
      location: 'Москва',
      services: [
        { name: 'Установка смесителя', price: 1200 },
        { name: 'Ремонт трубы', price: 1500 },
        { name: 'Устранение засора', price: 1000 }
      ]
    }
    // ...другие специалисты
  ];

  public openCard(specialist: any) {
    this.selectedSpecialist = specialist;
    this.dialogVisible = true;
  }

}
