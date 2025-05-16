import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export type OrderStatus = 'new' | 'inprogress' | 'completed';

export interface Order {
  id: number;
  title: string;
  jobDescription: string;
  address: string;
  date: string; // 'dd.mm.yyyy'
  time: string;
  status: OrderStatus;
}

@Injectable({ providedIn: 'root' })
export class OrderSharedService {
  
  private selectedDateSubject = new BehaviorSubject<Date | null>(null);
  selectedDate$ = this.selectedDateSubject.asObservable();
  specialistOrders: Order[] = [];

  constructor(private http: HttpClient) {}
  
  public getSpecialistOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/specialistsOrders');
  }

  public getSpecialistOrderById(id: number): Observable<Order | undefined> {
    return this.getSpecialistOrders().pipe(
      map(orders => orders.find(o => o.id === id))
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
      default: return '';
    }
  }

  getOrderByDate(date: Date): Order | null {
    const foundOrder = this.specialistOrders.find(order => {
      const [day, month, year] = order.date.split('.').map(Number);
      return (
        date.getDate() === day &&
        date.getMonth() + 1 === month &&
        date.getFullYear() === year
      );
    });
    return foundOrder || null;
  }

}