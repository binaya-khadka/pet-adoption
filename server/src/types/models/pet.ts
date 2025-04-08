import mongoose from 'mongoose';

interface Pet {
  _id: string;
  name: string;
  image: string;
  age: string;
  breed: string;
  isAdopted: boolean;
  onAdoptionByUser: mongoose.Types.ObjectId;
  adoptedByUser: mongoose.Types.ObjectId;
  createdAt: Date;
}

export { Pet };
