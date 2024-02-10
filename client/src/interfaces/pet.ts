interface Pet {
  id: string;
  name: string;
  age: string;
  breed: string;
  isAdopted: boolean;
  onAdoptionByUser: string;
  adoptedByUser: string;
  images: string[];
}

export type {
  Pet
}