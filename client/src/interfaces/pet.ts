import { User } from '.';

interface Pet {
  _id: string;
  name: string;
  age: string;
  breed: string;
  isAdopted: boolean;
  onAdoptionByUser: User;
  adoptedByUser?: User;
  image: string;
}

export type { Pet };
