import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getReviewsBySpecialist(specialistId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`/api/reviews?specialistId=${specialistId}`);
  }

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>('/api/reviews', review);
  }
}