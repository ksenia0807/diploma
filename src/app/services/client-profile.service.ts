import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/client.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientProfileService {

  constructor(private http: HttpClient) {}

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>('/api/clientsProfiles');
  }

  public getClientById(id: number): Observable<Client | undefined> {
    return this.getClients().pipe(
      map(users => users.find(u => u.id === id))
    );
  }
}