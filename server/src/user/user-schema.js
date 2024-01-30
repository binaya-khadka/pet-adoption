import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const model = mongoose.model;

const user = new Schema({
  name: String,
  email: String,
  password: String,
  pets: [{ type: mongoose.Types.ObjectId, ref: 'Pet' }],
  created: { type: Date, default: Date.now },
})

export const User = model('User', user)