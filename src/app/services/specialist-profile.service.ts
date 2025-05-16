import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  public getSpecialistProfiles(): Observable<Specialist[]> {
    return this.http.get<Specialist[]>('/api/specialistsProfiles');
  }

  public getSpecialistProfileById(id: number): Observable<Specialist | undefined> {
    return this.getSpecialistProfiles().pipe(
      map(specialistProfiles => specialistProfiles.find(sp => sp.id === id))
    );
  }
}