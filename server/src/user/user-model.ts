import { User } from 'src/types';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Users =
  mongoose.models.Users || mongoose.model<User>('Users', userSchema);

export { Users };
