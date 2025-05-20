import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { SpecialistService } from 'src/app/services/specialist.service';
import { Service } from 'src/app/models/service.model';
import { Specialist } from 'src/app/models/specialist.model';
import { SpecialistProfileService } from 'src/app/services/specialist-profile.service';
import { forkJoin, map } from 'rxjs';

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

  services: (Service & { specialist?: Specialist })[] = [];

  constructor(
    private router: Router,
    private specialistService: SpecialistService,
    private specialistProfileService: SpecialistProfileService
  ) {
    this.loadServices();
  }

  public loadServices() {
    forkJoin([
      this.specialistService.getServices(),
      this.specialistProfileService.getSpecialistProfiles()
    ]).pipe(
      map(([services, specialists]) => {
        return services.map(service => ({
          ...service,
          specialist: specialists.find(sp => sp.id === service.specialistId)
        }));
      })
    ).subscribe({
      next: (servicesWithSpecialists) => {
        this.services = servicesWithSpecialists;
      },
    });
  }

  public openCard(services: Service) {
    this.router.navigate(['/service', services.specialistId, services.id]);
  }

}
