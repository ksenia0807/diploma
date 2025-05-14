import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Specialist {
  id: number;
  avatar: string[];
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  services: Service[];
}

export interface Service {
  id?: number;
  title: string;
  description: string;
  works: Work[];
  location: string;
  photos: string[];
}

export interface Work {
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class SpecialistProfileService {

  private readonly specialists: Specialist[] = [
    {
        id: 22,
        avatar: ['assets/car2.jpg'],
        name: 'Иван',
        surname: 'Иванов',
        patronymic: 'Иванович',
        email: 'ivanov@example.com',
        phone: '+7 (999) 123-45-67',
        location: 'Москва',
        about: 'Профессиональный специалист с 10-летним опытом работы.',
        services: []
    },
  ];

  public getUsers(): Observable<Specialist[]> {
    return of(this.specialists).pipe();
  }

  public getUserById(id: number): Observable<Specialist | undefined> {
    return this.getUsers().pipe(
      map(users => users.find(u => u.id === id))
    );
  }
}