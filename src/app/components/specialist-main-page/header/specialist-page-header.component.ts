import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { ClientProfileService, User } from 'src/app/services/client-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-specialist-page-header',
  standalone: true,
  imports: [
    CommonModule,
    TabMenuModule,
  ],
  templateUrl: './specialist-page-header.component.html',
  styleUrl: './specialist-page-header.component.scss'
})
export class SpecialistPageHeaderComponent implements OnInit {

  public orderStatus: MenuItem[] | undefined;
  user?: User;
  specialists: User[] = [];

  ngOnInit() {
    this.orderStatus = [
        { label: 'Поступившие' },
        { label: 'В процессе' },
        { label: 'Завершенные' },
    ]

    this.clientProfileService.getUsers().subscribe(users => {
    if (users.length > 0) {
      this.user = users[1];  
    }
    });
  }

  constructor(
      private router: Router,
      private clientProfileService: ClientProfileService,
  ) {
    this.loadUsers();
  }
    
  public loadUsers() {
    this.clientProfileService.getUsers().subscribe(data => {
      this.specialists = data;
    });
  }
  
  public openProfile(user: User) {
    this.router.navigate(['/specialist-profile', user.id]);
  }
  
}
