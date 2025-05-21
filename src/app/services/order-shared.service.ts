import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of, shareReplay } from 'rxjs';
import { Order, OrderStatus } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderSharedService{
  
  private selectedDateSubject = new BehaviorSubject<Date | null>(null);
  selectedDate$ = this.selectedDateSubject.asObservable();
  private specialistOrders$: Observable<Order[]>;

  constructor(private http: HttpClient) {
    this.specialistOrders$ = this.getSpecialistOrders().pipe(
      shareReplay(1) 
    );
  }
  
  public getSpecialistOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/specialistsOrders');
  }

  public getOrdersBySpecialist(specialistId: number): Observable<Order[]> {
      return this.http.get<Order[]>(`/api/reviews?specialistId=${specialistId}`);
  }

  public createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/specialistsOrders', order);
  }

  public getSpecialistOrderById(id: number): Observable<Order | undefined> {
    return this.getSpecialistOrders().pipe(
      map(specialistOrders => specialistOrders.find(so => so.id === id))
    );
  }

  public selectDate(date: Date) {
    this.selectedDateSubject.next(date);
  }

  public getOrderDescription(order: Order): string {
    return `${order.jobDescription} Адрес: ${order.address}. Дата: ${order.date} Время: ${order.time}.`;
  }

  getStatusLabel(status: OrderStatus): string {
    switch (status) {
      case 'new': return 'Поступивший';
      case 'inprogress': return 'В процессе';
      case 'completed': return 'Завершённый';
      case 'canceled': return 'Отменен';
      default: return '';
    }
  }

  updateOrder(order: Order): Observable<Order> {
    // В реальном приложении здесь будет HTTP-запрос к серверу
    return of(order).pipe(delay(200)); // Имитация запроса
  }

}