import mongoose from "mongoose";

const pet = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  image: {
    type: String,
  },
  age: {
    type: String,
    require: true
  },
  breed: {
    type: String,
    require: true
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
    // type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Pet = mongoose.model('Pet', pet)