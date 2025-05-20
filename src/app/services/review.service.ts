import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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

  getAverageRating(specialistId: number): Observable<number> {
    return this.getReviewsBySpecialist(specialistId).pipe(
      map(reviews => {
        if (reviews.length === 0) return 5; 
        const sum = reviews.reduce((total, review) => total + review.rating, 0);
        return parseFloat((sum / reviews.length).toFixed(1));
      })
    );
  }

  getReviewCount(specialistId: number): Observable<number> {
    return this.getReviewsBySpecialist(specialistId).pipe(
      map(reviews => {
        return reviews.length;
      })
    );
  }

  
}