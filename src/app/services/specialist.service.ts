import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Specialist {
  id: number;
  title: string;
  rating: number;
  photos: string[];
  shortDescription: string;
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
      photos: ['assets/man.jpg', 'assets/2.jpg', 'assets/3.jpg', 'assets/man.jpg', 'assets/2.jpg', 'assets/3.jpg'],
      shortDescription: 'Я мастер с опытом работы более 8 лет, специализирующийся на установке и ремонте водопроводных и отопительных систем. Обеспечиваю качественное обслуживание и быстрое решение любых сантехнических проблем.',
      fullDescription: 'Я мастер с опытом работы более 8 лет, специализирующийся на установке и ремонте водопроводных и отопительных систем. Обеспечиваю качественное обслуживание и быстрое решение любых сантехнических проблем. Готов помочь вам с установкой, ремонтом и консультациями!',
      location: 'г. Москва',
      services: [
        { name: 'Установка смесителя', price: 1200 },
        { name: 'Ремонт трубы', price: 1500 },
        { name: 'Устранение засора', price: 1000 }
      ]
    },
    {
      id: 2,
      title: 'Ремонт автомобилей',
      rating: 4.7,
      photos: ['assets/car1.jpg', 'assets/car2.jpg', 'assets/car3.jpg'],
      shortDescription: 'Я мастер с опытом работы более 8 лет, специализирующийся на установке и ремонте водопроводных и отопительных систем. Обеспечиваю качественное обслуживание и быстрое решение любых сантехнических проблем.',
      fullDescription: 'Я мастер с опытом работы более 8 лет, специализирующийся на установке и ремонте водопроводных и отопительных систем. Обеспечиваю качественное обслуживание и быстрое решение любых сантехнических проблем. Готов помочь вам с установкой, ремонтом и консультациями!',
      location: 'г. Москва',
      services: [
        { name: 'Замена масла в коробке', price: 1200 },
        { name: 'Сход-развал', price: 1500 },
        { name: 'Замена колес', price: 1000 },
        { name: 'Полировка царапин', price: 1000 }
      ]
    },
    {
      id: 3,
      title: 'Ремонт автомобилей',
      rating: 4.5,
      photos: ['assets/car1.jpg', 'assets/car2.jpg', 'assets/car3.jpg'],
      shortDescription: 'Я мастер с опытом работы более 8 лет, специализирующийся на установке и ремонте водопроводных и отопительных систем. Обеспечиваю качественное обслуживание и быстрое решение любых сантехнических проблем.',
      fullDescription: 'Я мастер с опытом работы более 8 лет, специализирующийся на установке и ремонте водопроводных и отопительных систем. Обеспечиваю качественное обслуживание и быстрое решение любых сантехнических проблем. Готов помочь вам с установкой, ремонтом и консультациями!',
      location: 'г. Москва',
      services: [
        { name: 'Установка смесителя', price: 1200 },
        { name: 'Ремонт трубы', price: 1500 },
        { name: 'Устранение засора', price: 1000 }
      ]
    },
  ];

  public getSpecialists(): Observable<Specialist[]> {
    return of(this.specialists).pipe();
  }

  public getSpecialistById(id: number): Observable<Specialist | undefined> {
    return this.getSpecialists().pipe(
      map(specialists => specialists.find(s => s.id === id))
    );
  }
}