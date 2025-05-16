import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';

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
export class OrderSharedService{
  
  private selectedDateSubject = new BehaviorSubject<Date | null>(null);
  selectedDate$ = this.selectedDateSubject.asObservable();
  private specialistOrders$: Observable<Order[]>;

  constructor(private http: HttpClient) {
    this.specialistOrders$ = this.getSpecialistOrders().pipe(
      shareReplay(1) // Кэшируем результат
    );
  }
  
  public getSpecialistOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/specialistsOrders');
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
      default: return '';
    }
  }

  public getOrderByDate(date: Date): Observable<Order | undefined> {
    return this.specialistOrders$.pipe(
      map(orders => orders.find(order => {
        const [day, month, year] = order.date.split('.').map(Number);
        return (
          date.getDate() === day &&
          date.getMonth() + 1 === month &&
          date.getFullYear() === year
        );
      }))
    );
  }

}