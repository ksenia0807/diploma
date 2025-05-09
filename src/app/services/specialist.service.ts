import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface Specialist {
  id: number;
  title: string;
  rating: number;
  photos: string[];
  fullDescription: string;
  location: string;
  services: { name: string; price: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  private readonly specialists: Specialist[] = [
    {
      id: 1,
      title: 'Услуги сантехника',
      rating: 4.9,
      photos: ['assets/man.jpg', 'assets/2.jpg', 'assets/3.jpg'],
      fullDescription: 'Я мастер с опытом работы более 8 лет, специализирующийся на установке и ремонте водопроводных и отопительных систем. Обеспечиваю качественное обслуживание и быстрое решение любых сантехнических проблем. Готов помочь вам с установкой, ремонтом и консультациями!',
      location: 'Москва',
      services: [
        { name: 'Установка смесителя', price: 1200 },
        { name: 'Ремонт трубы', price: 1500 },
        { name: 'Устранение засора', price: 1000 }
      ]
    },
    // Добавьте других специалистов
  ];

  constructor() { }

  /** Получить всех специалистов */
  public getSpecialists(): Observable<Specialist[]> {
    // Имитируем задержку сервера 500мс
    return of(this.specialists).pipe(delay(500));
  }

  /** Получить специалиста по id */
  public getSpecialistById(id: number): Observable<Specialist | undefined> {
    return this.getSpecialists().pipe(
      map(specialists => specialists.find(s => s.id === id))
    );
  }
}