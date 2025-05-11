import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/orders');
  }

  public getOrderById(id: number): Observable<Order | undefined> {
    return this.getOrders().pipe(
      map(orders => orders.find(o => o.id === id))
    );
  }
}