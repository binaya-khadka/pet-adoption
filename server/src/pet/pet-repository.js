import { Pet } from "./pet-model.js";

const fetchAllPets = async () => {
  return await Pet.find({});
}

const addPet = async (payload) => {
  return await Pet.create(payload);
}

const updatePet = async (payload) => {
  const { id, name, age, breed, onAdoptionByUser } = payload;
  return await Pet.findByIdAndUpdate(id, { name, age, breed, onAdoptionByUser, isAdopted, adoptedByUser }, { new: true });
}

export {
  fetchAllPets,
  addPet,
  updatePet,
}