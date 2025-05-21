import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialistProfileService } from 'src/app/services/specialist-profile.service';
import { Specialist } from 'src/app/models/specialist.model';

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

  orderStatus: MenuItem[] | undefined;
  currentSpecialist?: Specialist;
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

    const specialistId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCurrentSpecialist(specialistId);

  }

  private loadCurrentSpecialist(id: number) {
    this.specialistProfileService.getSpecialistProfileById(id).subscribe({
      next: (specialist) => {
        this.currentSpecialist = specialist;
      },
      error: () => {
        console.error('Ошибка загрузки данных специалиста');
      }
    });
  }

  public changeStatus(status: string) {
    this.activeStatus = status;
    this.statusChanged.emit(status);
  }

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private specialistProfileService: SpecialistProfileService,
  ) {}
  
  public openProfile() {
    if (this.currentSpecialist) {
      this.router.navigate(['/specialist-profile', this.currentSpecialist.id]);
    }
  }
  
}
