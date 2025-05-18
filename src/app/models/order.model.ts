export type OrderStatus = 'new' | 'inprogress' | 'completed' | 'canceled';

export interface Order {
  id: number;
  specialistId: number;
  customerId: number;
  title: string;
  jobDescription: string;
  price: number;
  address: string;
  date: string; // 'dd.mm.yyyy'
  time: string;
  status: OrderStatus;
}