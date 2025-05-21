import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Specialist } from '../models/specialist.model';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  constructor(private http: HttpClient) {}
  
  public getServices(): Observable<Service[]> {
    return this.http.get<Service[]>('/api/services');
  }

  public getServiceById(id: number): Observable<Service | undefined> {
    return this. getServices().pipe(
      map(services => services.find(s => s.id === id))
    );
  }
}