import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientProfileService {

  private readonly clients: Client[] = [
    {
        id: 11,
        avatar: ['assets/avatar1.jpg'],
        name: 'Ксения',
        surname: 'Кадырова',
        patronymic: 'Дамировна',
        location: 'г. Москва'
    },
    {
      id: 22,
        avatar: ['assets/car2.jpg'],
        name: 'Алексей',
        surname: 'Власов',
        patronymic: 'Игоревич',
        location: 'г. Москва'
    },
  ];

  public getUsers(): Observable<Client[]> {
    return of(this.clients).pipe();
  }

  public getUserById(id: number): Observable<Client | undefined> {
    return this.getUsers().pipe(
      map(users => users.find(u => u.id === id))
    );
  }
}