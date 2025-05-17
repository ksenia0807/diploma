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
  currentOrder: Order | undefined; 
  ordersForDate: Order[] = [];
  description = '';
  orderVisible = false;

  constructor(public orderSharedService: OrderSharedService) {}

  onDateSelect(date: Date) {
    this.selectedDate = date;
    this.loadOrdersForDate(date);
  }

  loadOrdersForDate(date: Date) {
    this.orderSharedService.getOrdersByDate(date).subscribe({
      next: (orders) => {
        this.ordersForDate = orders;
      },
    });
  }

  hasOrders(): boolean {
    return this.ordersForDate.length > 0;
  }
}
