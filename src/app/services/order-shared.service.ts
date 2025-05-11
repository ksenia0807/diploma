import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type OrderStatus = 'new' | 'inprogress' | 'completed';

export interface Order {
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

  public selectDate(date: Date) {
    this.selectedDateSubject.next(date);
  }

  public readonly specialistOrders: Order = {
    title: 'Уборка однокомнатной квартиры',
    jobDescription: 'Генеральная уборка квартиры площадью 40 кв.м.',
    address: 'ул. Ленина, д. 10',
    date: '05.05.2025',
    time: '15:00',
    status: 'new'
  };

  public getOrderDescription(order: Order = this.specialistOrders): string {
    return `${order.jobDescription} Адрес: ${order.address}. Дата: ${order.date} Время: ${order.time}.`;
  }

  public getStatusLabel(status: OrderStatus): string {
    switch (status) {
      case 'new': return 'Поступивший';
      case 'inprogress': return 'В процессе';
      case 'completed': return 'Завершённый';
      default: return '';
    }
  }
}