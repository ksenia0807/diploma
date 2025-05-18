import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClientProfileService } from 'src/app/services/client-profile.service';
import { TableModule } from 'primeng/table';
import { ReviewService } from 'src/app/services/review.service';
import { OrderSharedService } from 'src/app/services/order-shared.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms'; 
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Client } from 'src/app/models/client.model';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-client-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    TableModule, 
    ButtonModule, 
    DialogModule,
    RatingModule,
    FormsModule,
    InputTextareaModule
  ],
  templateUrl: './client-profile-page.component.html',
  styleUrl: './client-profile-page.component.scss'
})
export class ClientProfilePageComponent implements OnInit {

    client?: Client;
    order?: Order;
    orders: Order[] = [];
    displayReviewDialog = false;
    selectedOrder?: Order;
    newReview = {
      rating: 0,
      comment: ''
    };

    constructor(
    private route: ActivatedRoute,
    private clientProfileService: ClientProfileService,
    private orderService: OrderSharedService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.clientProfileService.getUserById(userId).subscribe({
      next: (cli) => this.client = cli
    });

    this.orderService.getSpecialistOrders().subscribe(data => this.orders = data);
  }

  onRowSelect(order: Order) {
    if (order.status === 'completed') {
      this.selectedOrder = order;
      this.displayReviewDialog = true;
    }
  }

  submitReview() {
    if (!this.selectedOrder || !this.client) return;

    const review = {
      orderId: this.selectedOrder.id,
      specialistId: this.selectedOrder.specialistId, // Предполагаем, что в заказе есть ID специалиста
      clientId: this.client.id,
      authorName: `${this.client.surname} ${this.client.name}`,
      rating: this.newReview.rating,
      comment: this.newReview.comment,
      date: new Date()
    };

    this.reviewService.createReview(review).subscribe({
      next: () => {
        this.displayReviewDialog = false;
        this.newReview = { rating: 0, comment: '' };
        // Можно обновить список заказов или показать уведомление
      },
      error: (err) => console.error('Ошибка при отправке отзыва:', err)
    });
  }

  public getStatusLabel(status: string): string {
    switch (status) {
      case 'canceled': return 'Отменен';
      case 'inprogress': return 'В процессе';
      case 'completed': return 'Завершённый';
      case 'new': return 'Новый';
      default: return '';
    }
  }

}
