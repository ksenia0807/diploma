import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Specialist, SpecialistProfileService } from 'src/app/services/specialist-profile.service';

@Component({
  selector: 'app-specialist-profile-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specialist-profile-page.component.html',
  styleUrl: './specialist-profile-page.component.scss'
})
export class SpecialistProfilePageComponent implements OnInit{

  specialist?: Specialist;

  constructor(
    private route: ActivatedRoute,
    private specialistProfileService: SpecialistProfileService,
  ) {}
    
  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.specialistProfileService.getUserById(userId).subscribe({
    next: (spec) => {
      this.specialist = spec;
    },
    });
  }
}
