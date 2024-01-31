import * as petRepository from './pet-repository.js'

const getAllPets = async () => {
  const pet = await petRepository.fetchAllPets();
  if (pet.length === 0) {
    throw {
      message: 'No Pets Found'
    }
  }
  return pet;
}

const addPet = async (payload) => {
  return await petRepository.addPet(payload);
}

export {
  addPet,
  getAllPets,
}