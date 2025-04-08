import { Pet } from 'src/types';
import mongoose, { Model, mongo, Schema } from 'mongoose';

const PetSchema = new Schema<Pet>({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  age: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  isAdopted: {
    type: Boolean,
    default: false
  },
  onAdoptionByUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  adoptedByUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Pets =
  (mongoose.models.Pets as mongoose.Model<
    Pet,
    Record<string, never>,
    Record<string, never>,
    Record<string, never>,
    Pet
  >) || mongoose.model<Pet>('Pets', PetSchema);

export { Pets };
