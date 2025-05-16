import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Specialist, SpecialistProfileService } from 'src/app/services/specialist-profile.service';

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
  user?: Specialist;
  specialists: Specialist[] = [];
  activeStatus: string = 'new';

  @Output() statusChanged = new EventEmitter<string>();

  ngOnInit() {
    this.orderStatus = [
        { label: 'Поступившие',
          command: () => this.changeStatus('new')
        },
        { label: 'В процессе',
          command: () => this.changeStatus('inprogress')
        },
        { label: 'Завершенные',
          command: () => this.changeStatus('completed')
        },
    ]

    this.specialistProfileService.getUsers().subscribe(users => {
    if (users.length > 0) {
      this.user = users[0];  
    }
    });
  }

  public changeStatus(status: string) {
    this.activeStatus = status;
    this.statusChanged.emit(status);
  }

  constructor(
      private router: Router,
      private specialistProfileService: SpecialistProfileService,
  ) {
    this.loadUsers();
  }
    
  public loadUsers() {
    this.specialistProfileService.getUsers().subscribe(data => {
      this.specialists = data;
    });
  }
  
  public openProfile(user: Specialist) {
    this.router.navigate(['/specialist-profile', user.id]);
  }
  
}
