import { Pet } from "./pet-model.js";

const fetchAllPets = async () => {
  return await Pet.find({});
}

const addPet = async (payload) => {
  return await Pet.create(payload);
}

const updatePet = async (payload) => {
  const { id, name, age, breed } = payload;
  return await Pet.findByIdAndUpdate(id, { name, age, breed }, { new: true });
}

const petAdoption = async payload => {
  const { id, adoptedByUser } = payload;
  const pet = await Pet.findById(id);
  pet.adoptedByUser = adoptedByUser;
  pet.isAdopted = true;
  return await pet.save();
}

const deletePet = async (id) => {
  return await Pet.findByIdAndDelete(id);
}

const getPet = async (id) => {
  return await Pet.findById(id);
}

export {
  fetchAllPets,
  addPet,
  updatePet,
  deletePet,
  petAdoption,
  getPet
}