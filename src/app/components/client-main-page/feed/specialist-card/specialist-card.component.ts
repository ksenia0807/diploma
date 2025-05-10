import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { Specialist, SpecialistService } from 'src/app/services/specialist.service';

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

  specialists: Specialist[] = [];

  constructor(
    private router: Router,
    private specialistService: SpecialistService
  ) {
    this.loadSpecialists();
  }

  public loadSpecialists() {
    this.specialistService.getSpecialists().subscribe(data => {
      this.specialists = data;
    });
  }

  public openCard(specialist: Specialist) {
    this.router.navigate(['/specialist', specialist.id]);
  }

}
