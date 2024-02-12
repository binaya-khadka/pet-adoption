interface Pet {
  id: string;
  name: string;
  age: string;
  breed: string;
  isAdopted: boolean;
  onAdoptionByUser: string;
  adoptedByUser: string;
  image: string;
}

export type {
  Pet
}