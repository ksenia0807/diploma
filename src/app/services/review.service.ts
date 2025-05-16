import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
  orderId: number;
  specialistId: number;
  clientId: number;
  authorName: string;
  rating: number;
  comment: string;
  date: Date;
}

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