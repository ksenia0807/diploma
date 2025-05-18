import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OrderSharedService } from 'src/app/services/order-shared.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order.model';


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
    return `<b><b>${order.jobDescription}</b></b><br><br> 
    Адрес: <b>${order.address}</b>.<br>
    Дата: <b>${order.date}</b><br>
    Время: <b>${order.time}</b><br>
    Цена: <b>${order.price}</b>.`;
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
  }
  
  public declineOrder(order: any) {
    this.spesialistOrders = this.spesialistOrders.filter(o => o.id !== order.id);
    
    if (this.spesialistOrder && this.spesialistOrder.id === order.id) {
      this.spesialistOrder = undefined;
    }
  }
  
  public completeOrder(order: any) {
    order.status = 'completed';
  }
}
