export interface Review {
  orderId: number;
  specialistId: number;
  clientId: number;
  authorName: string;
  rating: number;
  comment: string;
  date: Date;
}