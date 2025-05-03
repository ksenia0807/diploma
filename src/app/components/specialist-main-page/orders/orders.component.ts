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

  public orderVisible = true;

  public readonly order = {
    title: 'Уборка однокомнатной квартиры',
    description: 'Генеральная уборка квартиры площадью 40 кв.м. Адрес: ул. Ленина, д. 10. Время: 15:00.',
    status: 'new' // 'new' | 'inprogress' | 'completed'
  };
  
  getStatusLabel(status: string): string {
    switch (status) {
      case 'new': return 'Поступивший';
      case 'inprogress': return 'В процессе';
      case 'completed': return 'Завершённый';
      default: return '';
    }
  }
  
  acceptOrder() {
    this.order.status = 'inprogress';
    // Логика принятия заказа
  }
  
  declineOrder() {
    this.orderVisible = false;
  }
  
  completeOrder() {
    this.order.status = 'completed';
    // Логика завершения заказа
  }
}
