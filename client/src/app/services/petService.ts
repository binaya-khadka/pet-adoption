import { MutationFunction, QueryFunction } from 'react-query';
import { Pet } from '../../interfaces';
import { API } from '../lib';
import endpoints from './end-points';

interface NewPet {
  _id: string;
  name: string;
  image: string;
  age: string;
  breed: string;
  isAdopted: string;
  onAdoptionByUser: string;
  adoptedByUser: string;
}

interface IAdoptPet {
  _id: string;
  userId: string;
}

const getAllPets: QueryFunction<{
  message: string;
  data: Pet[] | null;
}> = async () => {
  return await API.get(endpoints.pet);
};

const addPet: MutationFunction<{
  message: string;
  data: Pet;
}> = async (data) => {
  const headers = {
    'Content-Type': 'multipart/form-data'
  };
  return await API.post(endpoints.pet, data, { headers });
};

const fetchPet: QueryFunction<{
  message: string;
  data: NewPet | null;
}> = async (_id) => {
  return await API.get(`${endpoints.pet}/${_id?.queryKey[1]}`);
};

const adoptPet: MutationFunction<
  {
    message: string;
    data: NewPet | null;
  },
  IAdoptPet
> = async (_data) => {
  return await API.put(`${endpoints.pet}/adopt/${_data?._id}`, {
    adoptedByUser: _data?.userId
  });
};

export { getAllPets, addPet, fetchPet, adoptPet };
