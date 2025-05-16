import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Order, OrderSharedService } from 'src/app/services/order-shared.service';
import { ActivatedRoute } from '@angular/router';


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

  public spesialistOrders: Order[] = [];
  public spesialistOrder?: Order;

  constructor(
    private route: ActivatedRoute,
    private orderSharedService: OrderSharedService,
  ) {}

  ngOnInit() {

    const specialistOrderId = Number(this.route.snapshot.paramMap.get('id'));
    this.orderSharedService.getSpecialistOrderById(specialistOrderId).subscribe({
    next: (o) => {
      this.spesialistOrder = o;
    },
    });

    this.orderSharedService.getSpecialistOrders().subscribe(data => this.spesialistOrders = data);
  }

  public getOrderDate(orderDateString: string): Date {
    const [day, month, year] = orderDateString.split('.').map(Number);
    return new Date(year, month - 1, day);
  }

  public getFilteredOrders() {
    return this.spesialistOrders.filter(order => order.status === this.currentStatus);
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
  }
  
  public acceptOrder(order: any) {
    order.status = 'inprogress';
    // Логика принятия заказа
  }
  
  public declineOrder(order: any) {
    this.spesialistOrders = this.spesialistOrders.filter(o => o.id !== order.id);
    
    if (this.spesialistOrder && this.spesialistOrder.id === order.id) {
      this.spesialistOrder = undefined;
    }
    
    // Здесь можно добавить вызов API для фактического удаления на сервере
    // this.orderSharedService.deleteOrder(order.id).subscribe();
  }
  
  public completeOrder(order: any) {
    order.status = 'completed';
    // Логика завершения заказа
  }
}
