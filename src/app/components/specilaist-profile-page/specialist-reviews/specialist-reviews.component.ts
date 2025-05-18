import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SpecialistProfileService } from 'src/app/services/specialist-profile.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { Specialist } from 'src/app/models/specialist.model';
import { Review } from 'src/app/models/review.model';

@Component({
  selector: 'app-specialist-reviews',
  standalone: true,
  imports: [
    CommonModule,
    CardModule
  ],
  templateUrl: './specialist-reviews.component.html',
  styleUrl: './specialist-reviews.component.scss'
})
export class SpecialistReviewsComponent implements OnInit{

  specialistId!: number;
  specialist?: Specialist;
  specialists: Specialist[] = [];
  reviews: Review[] = [];

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private specialistProfileService: SpecialistProfileService
  ) {}

  ngOnInit() {
    this.specialistId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.specialistProfileService.getSpecialistProfileById(this.specialistId).subscribe(spec => {
      this.specialist = spec;
    });

    this.reviewService.getReviewsBySpecialist(this.specialistId).subscribe(reviews => {
      this.reviews = reviews;
    });

    this.specialistProfileService.getSpecialistProfiles().subscribe(data => this.specialists = data);
  }
}
