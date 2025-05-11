import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Order {
  id: number;
  date: string;
  title: string;
  price: number;
  status: 'Выполнен' | 'В процессе' | 'Отменен';
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly orders: Order[] = [
    {
        id: 101,
        date: '2025-05-01',
        title: 'Установка смесителя',
        price: 1200,
        status: 'Выполнен'
      },
      {
        id: 102,
        date: '2025-05-10',
        title: 'Ремонт трубы',
        price: 1500,
        status: 'В процессе'
      },
      {
        id: 103,
        date: '2025-05-15',
        title: 'Устранение засора',
        price: 1000,
        status: 'Отменен'
      }
  ];

  public getOrders(): Observable<Order[]> {
    return of(this.orders).pipe();
  }

  public getOrderById(id: number): Observable<Order | undefined> {
    return this.getOrders().pipe(
      map(orders => orders.find(o => o.id === id))
    );
  }
}