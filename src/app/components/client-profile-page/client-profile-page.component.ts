import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClientProfileService, User } from 'src/app/services/client-profile.service';

@Component({
  selector: 'app-client-profile-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-profile-page.component.html',
  styleUrl: './client-profile-page.component.scss'
})
export class ClientProfilePageComponent implements OnInit {

    client?: User;

    constructor(
      private route: ActivatedRoute,
      private clientProfileService: ClientProfileService,
    ) {}
  
    ngOnInit() {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.clientProfileService.getUserById(id).subscribe({
      next: (cli) => {
        this.client = cli;
      },
    });
    }
}
