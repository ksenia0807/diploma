import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialistPageHeaderComponent } from "./header/specialist-page-header.component";
import { OrdersComponent } from "./orders/orders.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-specialist-main-page',
  standalone: true,
  imports: [
    CommonModule, 
    SpecialistPageHeaderComponent, 
    OrdersComponent, 
    CalendarComponent, 
    ScrollPanelModule
  ],
  templateUrl: './specialist-main-page.component.html',
  styleUrl: './specialist-main-page.component.scss'
})
export class SpecialistMainPageComponent {

  currentStatus: string = 'new';

  public onStatusChanged(status: string) {
    this.currentStatus = status;
  }
}
