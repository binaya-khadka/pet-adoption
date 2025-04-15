import { MutationFunction, QueryFunction } from 'react-query';

import { API } from '../lib';
import { Pet } from '../../interfaces';
import endpoints from './end-points';

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
  data: Pet | null;
}> = async (_id) => {
  return await API.get(`${endpoints.pet}/${_id?.queryKey[1]}`);
};

const adoptPet: MutationFunction<
  {
    message: string;
    data: Pet | null;
  },
  IAdoptPet
> = async (_data) => {
  return await API.put(`${endpoints.pet}/adopt/${_data?._id}`, {
    adoptedByUser: _data?.userId
  });
};

export { getAllPets, addPet, fetchPet, adoptPet };
