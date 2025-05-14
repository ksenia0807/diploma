import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileService, User } from 'src/app/services/client-profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specialist-profile-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specialist-profile-page.component.html',
  styleUrl: './specialist-profile-page.component.scss'
})
export class SpecialistProfilePageComponent implements OnInit{

  specialist?: User;

  constructor(
    private route: ActivatedRoute,
    private clientProfileService: ClientProfileService,
  ) {}
    
  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.clientProfileService.getUserById(userId).subscribe({
    next: (spec) => {
      this.specialist = spec;
    },
    });
  }
}
