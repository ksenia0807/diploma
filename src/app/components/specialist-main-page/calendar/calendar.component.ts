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
  order: Order;
  description = '';
  statusLabel = '';

  constructor(public orderSharedService: OrderSharedService) {
    this.order = this.orderSharedService.specialistOrders;
  }
  
  onDateSelect(date: Date) {
    this.selectedDate = date;
    this.orderVisible = this.isOrderDate(date);

    if (this.orderVisible) {
      this.description = this.orderSharedService.getOrderDescription(this.order);
      // this.statusLabel = this.orderSharedService.getStatusLabel(this.order.status);
    }
  }

  isOrderDate(date: Date | null): boolean {
    if (!date) return false;
    const [day, month, year] = this.order.date.split('.').map(Number);
    return (
      date.getDate() === day &&
      date.getMonth() + 1 === month &&
      date.getFullYear() === year
    );
  }

}
