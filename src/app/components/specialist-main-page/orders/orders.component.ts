import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OrderSharedService } from 'src/app/services/order-shared.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { ClientProfileService } from 'src/app/services/client-profile.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{

  @Input() currentStatus: string = 'new';

  public selectedDate: Date | null = null;
  public orderVisible = true;
  public specialistOrders: Order[] = [];
  public specialistOrder?: Order;
  public ordersWithClientInfo: any[] = [];
  public currentSpecialistId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderSharedService: OrderSharedService,
    private clientProfileService: ClientProfileService
  ) {}

  ngOnInit() {
    this.currentSpecialistId = Number(this.route.snapshot.paramMap.get('id'));

    forkJoin([
      this.orderSharedService.getSpecialistOrders(),
      this.clientProfileService.getClients()
    ]).subscribe(([orders, clients]) => {
      this.specialistOrders = orders.filter(order => 
        order.specialistId === this.currentSpecialistId && order.status !== 'canceled'
      );
      this.ordersWithClientInfo = this.specialistOrders.map(order => {
        const client = clients.find(c => c.id === order.customerId);
        return {
          ...order,
          clientLogin: client?.login || 'Неизвестный клиент',
          clientPhone: client?.phone || 'Телефон не указан'
        };
      });
    });
  }

  public getOrderDate(orderDateString: string): Date {
    const [day, month, year] = orderDateString.split('.').map(Number);
    return new Date(year, month - 1, day);
  }

  public getFilteredOrders() {
    return this.ordersWithClientInfo.filter(order => order.status === this.currentStatus);
  }
  
  public getOrderDescription(order: any): string {
    return `<b><b>${order.jobDescription}</b></b><br><br> 
    Адрес: <b>${order.address}</b>.<br>
    Дата: <b>${order.date}</b><br>
    Время: <b>${order.time}</b><br>
    Цена: <b>${order.price}</b>`;
  }

  public getOrderCustomer(order: any): string {
    return `Клиент: <b>${order.clientLogin}</b><br>
      Телефон: <b>${order.clientPhone}</b>`;
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
    this.specialistOrders = this.specialistOrders.filter(o => o.id !== order.id);
    this.ordersWithClientInfo = this.ordersWithClientInfo.filter(o => o.id !== order.id);
    
    if (this.specialistOrder && this.specialistOrder.id === order.id) {
      this.specialistOrder = undefined;
    }
  }
  
  public completeOrder(order: any) {
    order.status = 'completed';
  }
}
