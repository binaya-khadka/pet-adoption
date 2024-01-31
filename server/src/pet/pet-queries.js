import { Pet } from './pet-model.js'

const addPet = async (payload) => {
  const pet = await Pet.create(payload);
  return pet;
}

const getAllPets = async () => {
  const pet = await Pet.find({});
  return pet;
}

export {
  addPet,
  getAllPets,
}