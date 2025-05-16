import { Component, Input } from '@angular/core';
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

  @Input() currentStatus: string = 'new';

  public selectedDate: Date | null = null;

  public orderVisible = true;

  public orders = [
    {
      id: 1,
      title: 'Уборка однокомнатной квартиры',
      jobDescription: 'Генеральная уборка квартиры площадью 40 кв.м.',
      address: 'ул. Ленина, д. 10',
      date: '05.05.2025',
      time: '15:00',
      status: 'new' as 'new' | 'inprogress' | 'completed'
    },
    {
      id: 2,
      title: 'Ремонт ванной комнаты',
      jobDescription: 'Замена сантехники и плитки',
      address: 'ул. Гагарина, д. 5',
      date: '06.05.2025',
      time: '10:00',
      status: 'inprogress' as 'new' | 'inprogress' | 'completed'
    },
    {
      id: 3,
      title: 'Доставка продуктов',
      jobDescription: 'Доставка продуктов из магазина',
      address: 'ул. Пушкина, д. 15',
      date: '04.05.2025',
      time: '12:00',
      status: 'completed' as 'new' | 'inprogress' | 'completed'
    }
  ];

  public getOrderDate(orderDateString: string): Date {
    const [day, month, year] = orderDateString.split('.').map(Number);
    return new Date(year, month - 1, day);
  }

  public getFilteredOrders() {
    return this.orders.filter(order => order.status === this.currentStatus);
  }
  
  public getOrderDescription(order: any): string {
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
    
    // const isSameDate =
    //   date.getDate() === this.orderDate.getDate() &&
    //   date.getMonth() === this.orderDate.getMonth() &&
    //   date.getFullYear() === this.orderDate.getFullYear();

    // this.orderVisible = isSameDate;
  }
  
  public acceptOrder(order: any) {
    order.status = 'inprogress';
    // Логика принятия заказа
  }
  
  public declineOrder(order: any) {
    order.visible = false;
  }
  
  public completeOrder(order: any) {
    order.status = 'completed';
    // Логика завершения заказа
  }
}
