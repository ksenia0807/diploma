import { Work } from "./work.model";

export interface Service {
  id?: number;
  specialistId: number;
  title: string;
  works: Work[];
  location: string;
  photos: string[];
}