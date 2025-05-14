import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}
  
  public getSpecialists(): Observable<Specialist[]> {
    return this.http.get<Specialist[]>('/api/specialists');
  }

  public getSpecialistById(id: number): Observable<Specialist | undefined> {
    return this.getSpecialists().pipe(
      map(specialists => specialists.find(s => s.id === id))
    );
  }
}