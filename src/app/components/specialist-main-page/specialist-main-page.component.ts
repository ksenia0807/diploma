import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialistPageHeaderComponent } from "./header/specialist-page-header.component";
import { OrdersComponent } from "./orders/orders.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ActivatedRoute } from '@angular/router';
import { OrderSharedService } from 'src/app/services/order-shared.service';
import { Order } from 'src/app/models/order.model';

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
  currentSpecialistId: number | null = null;
  specialistOrders: Order[] = [];

  public onStatusChanged(status: string) {
    this.currentStatus = status;
  }

  constructor(
    private route: ActivatedRoute,
    private orderSharedService: OrderSharedService
  ) {
    this.currentSpecialistId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOrders();
  }

  loadOrders() {
    this.orderSharedService.getSpecialistOrders().subscribe(orders => {
      this.specialistOrders = orders.filter(order => 
        order.specialistId === this.currentSpecialistId
      );
    });
  }
}
