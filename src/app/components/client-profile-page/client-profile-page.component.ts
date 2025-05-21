import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
import { AuthService } from 'src/app/services/auth.service';

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
    clientOrders: Order[] = [];
    currentClientId: number | null = null;
    displayReviewDialog = false;
    selectedOrder?: Order;
    newReview = {
      rating: 0,
      comment: ''
    };

    constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientProfileService: ClientProfileService,
    private orderService: OrderSharedService,
    private reviewService: ReviewService,
    private authService: AuthService
  ) {
    this.currentClientId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.clientProfileService.getClientById(userId).subscribe({
      next: (client) => {
        this.client = client;
        this.loadClientOrders(userId); 
      }
    });
  }

  private loadClientOrders(clientId: number) {
    this.orderService.getSpecialistOrders().subscribe(allOrders => {
      this.clientOrders = allOrders.filter(order => order.customerId === clientId);
    });
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
      specialistId: this.selectedOrder.specialistId, 
      clientId: this.client.id,
      login: `${this.client.login}`,
      rating: this.newReview.rating,
      comment: this.newReview.comment,
      date: new Date()
    };

    this.reviewService.createReview(review).subscribe({
      next: () => {
        this.displayReviewDialog = false;
        this.newReview = { rating: 0, comment: '' };
      },
      error: (err) => console.error('Ошибка при отправке отзыва:', err)
    });
  }

  public getStatusLabel(status: string): string {
    switch (status) {
      case 'canceled': return 'Отменена';
      case 'inprogress': return 'В процессе';
      case 'completed': return 'Завершённая';
      case 'new': return 'Новоя';
      default: return '';
    }
  }

  public logout() {
    this.authService.logout(); // Вызов метода выхода из сервиса
    this.router.navigate(['/auth']); // Перенаправление на страницу авторизации
  }

}
