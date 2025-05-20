import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialistService } from 'src/app/services/specialist.service';
import { ButtonModule } from 'primeng/button';
import { OrderModalService } from 'src/app/services/order-modal.service';
import { ClientProfileService } from 'src/app/services/client-profile.service';
import { Specialist } from 'src/app/models/specialist.model';
import { Service } from 'src/app/models/service.model';
import { SpecialistProfileService } from 'src/app/services/specialist-profile.service';
import { forkJoin, map, switchMap } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';


@Component({
  selector: 'app-specialist-detail',
  standalone: true,
  imports: [CommonModule, GalleriaModule, ButtonModule],
  templateUrl: './specialist-detail.component.html',
  styleUrl: './specialist-detail.component.scss',
  providers: [OrderModalService]
})
export class SpecialistDetailComponent implements OnInit{

  specialist?: Specialist;
  service?: Service;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private specialistService: SpecialistService,
    private specialistProfileService: SpecialistProfileService,
    private clientProfileService: ClientProfileService,
    private reviewService: ReviewService
  ) {
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData(id);
  }

  private loadData(serviceId: number) {
    forkJoin([
      this.specialistService.getServiceById(serviceId),
      this.specialistProfileService.getSpecialistProfiles()
    ]).pipe(
      switchMap(([service, specialists]) => {
        this.service = service;
        const specialist = specialists.find(sp => sp.id === service?.specialistId);
        
        if (!specialist) {
          throw new Error('Специалист не найден');
        }

        return this.reviewService.getAverageRating(specialist.id).pipe(
          map(rating => {
            return {
              service,
              specialist: { ...specialist, rating }
            };
          })
        );
      })
    ).subscribe({
      next: ({ service, specialist }) => {
        this.service = service;
        this.specialist = {
          ...specialist,
          rating: Number(specialist.rating)
        };
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Ошибка загрузки данных';
        this.loading = false;
      }
    });
  }

  private readonly _orderDialogService = inject(OrderModalService);

  public showDialog() {
    this._orderDialogService.open(this.service?.works ?? []);
  }

}
