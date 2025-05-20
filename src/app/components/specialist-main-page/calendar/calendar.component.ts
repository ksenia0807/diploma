import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { OrderSharedService } from 'src/app/services/order-shared.service';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Order } from 'src/app/models/order.model';

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
  styleUrl: './calendar.component.scss',
  providers: [DatePipe],
})
export class CalendarComponent {

  @Input() orders: Order[] = []; 
  selectedDate: Date | null = null;
  ordersForDate: Order[] = [];
  currentOrder: Order | undefined; 
  description = '';
  orderVisible = false;

  constructor(
    public orderSharedService: OrderSharedService,
    private datePipe: DatePipe
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['orders'] && this.selectedDate) {
      this.filterOrdersByDate(this.selectedDate);
    }
  }

  onDateSelect(date: Date) {
    this.selectedDate = date;
    this.filterOrdersByDate(date);
  }

  private filterOrdersByDate(date: Date) {
    const dateString = this.datePipe.transform(date, 'dd.MM.yyyy')!;
    this.ordersForDate = this.orders.filter(order => 
      order.date === dateString && order.status !== 'canceled'
    );
  }

  hasOrders(): boolean {
    return this.ordersForDate.length > 0;
  }
}
