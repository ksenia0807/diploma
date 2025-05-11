import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClientProfileService, User } from 'src/app/services/client-profile.service';
import { Order, OrdersService } from 'src/app/services/orders.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-client-profile-page',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './client-profile-page.component.html',
  styleUrl: './client-profile-page.component.scss'
})
export class ClientProfilePageComponent implements OnInit {

    client?: User;
    order?: Order;
    orders: Order[] = [];

    constructor(
      private route: ActivatedRoute,
      private clientProfileService: ClientProfileService,
      private orderService: OrdersService,
    ) {}
  
    ngOnInit() {
      const userId = Number(this.route.snapshot.paramMap.get('id'));
      this.clientProfileService.getUserById(userId).subscribe({
      next: (cli) => {
        this.client = cli;
      },
      });

      const orderId = Number(this.route.snapshot.paramMap.get('id'));
      this.orderService.getOrderById(orderId).subscribe({
      next: (o) => {
        this.order = o;
      },
      });

      this.orderService.getOrders().subscribe(data => this.orders = data);
    }


}
