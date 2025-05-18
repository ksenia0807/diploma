import { Service } from "./service.model";

export interface Specialist {
  id: number;
  avatar: string[];
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  services: Service[];
}