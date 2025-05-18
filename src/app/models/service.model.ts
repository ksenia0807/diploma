import { Work } from "./work.model";

export interface Service {
  id?: number;
  title: string;
  description: string;
  works: Work[];
  location: string;
  photos: string[];
}