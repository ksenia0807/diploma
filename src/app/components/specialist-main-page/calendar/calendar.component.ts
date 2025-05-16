import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { Order, OrderSharedService } from 'src/app/services/order-shared.service';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule, 
    CalendarModule, 
    FormsModule, 
    CardModule,
    ScrollPanelModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  selectedDate: Date | null = null;
  orderVisible = false;
  currentOrder: Order | null = null;
  description = '';
  statusLabel = '';

  constructor(public orderSharedService: OrderSharedService) {
    // this.order = this.orderSharedService.specialistOrders;
  }
  
  onDateSelect(date: Date) {
    this.selectedDate = date;
    this.currentOrder = this.orderSharedService.getOrderByDate(date);
    
    if (this.currentOrder) {
      this.description = this.orderSharedService.getOrderDescription(this.currentOrder);
      this.statusLabel = this.orderSharedService.getStatusLabel(this.currentOrder.status);
    }
  }

  acceptOrder() {
    if (this.currentOrder) {
      this.currentOrder.status = 'inprogress';
      this.statusLabel = this.orderSharedService.getStatusLabel(this.currentOrder.status);
    }
  }

  declineOrder() {
    this.currentOrder = null;
  }

  completeOrder() {
    if (this.currentOrder) {
      this.currentOrder.status = 'completed';
      this.statusLabel = this.orderSharedService.getStatusLabel(this.currentOrder.status);
    }
  }

}
