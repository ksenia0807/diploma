export interface Review {
  orderId: number;
  specialistId: number;
  clientId: number;
  login: string;
  rating: number;
  comment: string;
  date: Date;
}