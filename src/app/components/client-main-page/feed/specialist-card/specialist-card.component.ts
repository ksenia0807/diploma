import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { SpecialistService } from 'src/app/services/specialist.service';
import { Service } from 'src/app/models/service.model';
import { Specialist } from 'src/app/models/specialist.model';
import { SpecialistProfileService } from 'src/app/services/specialist-profile.service';
import { forkJoin, map, switchMap } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-specialist-card',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
],
  templateUrl: './specialist-card.component.html',
  styleUrl: './specialist-card.component.scss'
})
export class SpecialistCardComponent {

  services: (Service & { specialist?: Specialist, rating?: number })[] = [];

  constructor(
    private router: Router,
    private specialistService: SpecialistService,
    private specialistProfileService: SpecialistProfileService,
    private reviewService: ReviewService
  ) {
    this.loadServices();
  }

  public loadServices() {
    forkJoin([
      this.specialistService.getServices(),
      this.specialistProfileService.getSpecialistProfiles()
    ]).pipe(
      switchMap(([services, specialists]) => {
        const ratingRequests = specialists.map(specialist => 
          this.reviewService.getAverageRating(specialist.id).pipe(
            map(rating => ({ ...specialist, rating }))
          )
        );
        return forkJoin(ratingRequests).pipe(
          map(updatedSpecialists => ({
            services,
            specialists: updatedSpecialists
          }))
        );
      }),
      map(({services, specialists}) => {
        return services.map(service => ({
          ...service,
          specialist: specialists.find(sp => sp.id === service.specialistId)
        }));
      })
    ).subscribe({
      next: (servicesWithSpecialists) => {
        this.services = servicesWithSpecialists;
      },
      error: (err) => {
        console.error('Ошибка загрузки данных:', err);
      }
    });
  }

  public openCard(service: Service) {
    if (service.specialistId) {
      this.reviewService.updateSpecialistRating(service.specialistId).subscribe({
        next: () => {
          this.router.navigate(['/service', service.specialistId, service.id]);
        },
        error: (err) => {
          console.error('Ошибка обновления рейтинга:', err);
          this.router.navigate(['/service', service.specialistId, service.id]);
        }
      });
    } else {
      this.router.navigate(['/service', service.specialistId, service.id]);
    }
  }

}
