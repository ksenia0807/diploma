import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  public selectedDate: Date | null = null;

  public orderVisible = true;

  public readonly order = {
    title: 'Уборка однокомнатной квартиры',
    jobDescription: 'Генеральная уборка квартиры площадью 40 кв.м.',
    address: 'ул. Ленина, д. 10',
    date: '05.05.2025',
    time: '15:00',
    status: 'new' as 'new' | 'inprogress' | 'completed'
  };

  get orderDate(): Date {
    const [day, month, year] = this.order.date.split('.').map(Number);
    return new Date(year, month - 1, day);
  }
  
  public getOrderDescription(order = this.order): string {
    return `${order.jobDescription} Адрес: ${order.address}. Дата: <b>${order.date}</b> Время: <b>${order.time}</b>.`;
  }
  
  public getStatusLabel(status: string): string {
    switch (status) {
      case 'new': return 'Поступивший';
      case 'inprogress': return 'В процессе';
      case 'completed': return 'Завершённый';
      default: return '';
    }
  }

  public onDateSelect(date: Date) {
    this.selectedDate = date;
    
    const isSameDate =
      date.getDate() === this.orderDate.getDate() &&
      date.getMonth() === this.orderDate.getMonth() &&
      date.getFullYear() === this.orderDate.getFullYear();

    this.orderVisible = isSameDate;
  }
  
  public acceptOrder() {
    this.order.status = 'inprogress';
    // Логика принятия заказа
  }
  
  public declineOrder() {
    this.orderVisible = false;
  }
  
  public completeOrder() {
    this.order.status = 'completed';
    // Логика завершения заказа
  }
}
