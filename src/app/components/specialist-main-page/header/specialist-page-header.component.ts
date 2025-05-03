import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';

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

    ngOnInit() {
        this.orderStatus = [
            { label: 'Поступившие' },
            { label: 'В процессе' },
            { label: 'Завершенные' },
        ]
    }
  
}
