import { Pet } from 'src/types';
import { Pets } from '.';
import { Document } from 'mongoose';

const fetchAllPets = async () => {
  return await Pets.find({});
};

const addPet = async (
  payload: Omit<Pet, '_id' | 'createdAt' | 'isAdopted' | 'adoptedByUser'>
) => {
  return await Pets.create(payload);
};

const updatePet = async (payload: Partial<Pet>) => {
  const { _id, name, age, breed } = payload;
  return await Pets.findByIdAndUpdate(_id, { name, age, breed }, { new: true });
};

const petAdoption = async (payload: any) => {
  const { _id, adoptedByUser } = payload;
  const pet = (await Pets.findById(_id)) as (Pet & Document) | null;

  if (pet?.isAdopted) {
    throw new Error('Pet already adopted');
  }

  if (!pet) {
    throw new Error('Pet not found');
  }

  pet.adoptedByUser = adoptedByUser;
  pet.isAdopted = true;

  return await pet.save();
};

const deletePet = async (id: string) => {
  return await Pets.findByIdAndDelete({
    _id: id
  });
};

const getPet = async (id: string) => {
  return await Pets.findById({
    _id: id
  })
    .populate('onAdoptionByUser', 'name email')
    .populate('adoptedByUser', 'name email');
};

async function getPetByUser(userId: string) {
  return await Pets.find({
    onAdoptionByUser: userId
  });
}

export {
  fetchAllPets,
  addPet,
  updatePet,
  deletePet,
  petAdoption,
  getPet,
  getPetByUser
};
