import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  avatar: string[];
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientProfileService {

  private readonly clients: User[] = [
    {
        id: 11,
        avatar: ['assets/man.jpg'],
        name: 'Ксения',
        surname: 'Кадырова',
        patronymic: 'Дамировна',
        location: 'г. Москва'
    },
    {
      id: 11,
        avatar: ['assets/car2.jpg'],
        name: 'Алексей',
        surname: 'Власов',
        patronymic: 'Игоревич',
        location: 'г. Москва'
    },
  ];

  public getUsers(): Observable<User[]> {
    return of(this.clients).pipe();
  }

  public getUserById(id: number): Observable<User | undefined> {
    return this.getUsers().pipe(
      map(clients => clients.find(c => c.id === id))
    );
  }
}