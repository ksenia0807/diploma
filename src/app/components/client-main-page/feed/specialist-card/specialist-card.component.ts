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
import { Work } from 'src/app/models/work.model';

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

  filteredServices: (Service & { specialist?: Specialist, rating?: number })[] = [];
  private allServices: (Service & { specialist?: Specialist, rating?: number })[] = [];

  currentFilters: {
    city?: string;
    priceRange?: { min: number; max: number };
    rating?: number;
  } = {};

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
        this.allServices = servicesWithSpecialists;
        this.filteredServices = [...this.allServices];
      },
      error: (err) => {
        console.error('Ошибка загрузки данных:', err);
      }
    });
  }

  public applyFilters(filters: {
    city?: string;
    priceRange?: { min: number; max: number };
    rating?: number;
  }) {
    this.currentFilters = filters;
    this.filterServices();
  }

  private filterServices() {
    this.filteredServices = this.allServices.filter(service => {
    
      if (this.currentFilters.city && 
          service.location !== this.currentFilters.city) {
        return false;
      }

      if (this.currentFilters.rating && 
          (!service.specialist?.rating || 
           service.specialist.rating < this.currentFilters.rating)) {
        return false;
      }

      if (this.currentFilters.priceRange) {
        const avgPrice = this.calculateAveragePrice(service.works);
        if (avgPrice < this.currentFilters.priceRange.min || 
            avgPrice > this.currentFilters.priceRange.max) {
          return false;
        }
      }

      return true;
    });
  }

  private calculateAveragePrice(works: Work[]): number {
    if (!works || works.length === 0) return 0;
    const sum = works.reduce((total, work) => total + work.price, 0);
    return sum / works.length;
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
