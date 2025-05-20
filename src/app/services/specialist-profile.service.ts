import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Specialist } from '../models/specialist.model';


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

  updateSpecialistRating(id: number, rating: number): Observable<Specialist> {
  return this.http.patch<Specialist>(
    `/api/specialistsProfiles/${id}/rating`, 
    { rating }
  );
  }
}