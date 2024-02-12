import { MutationFunction, QueryFunction } from "react-query";
import { Pet } from "../../interfaces";
import { API } from "../lib";
import endpoints from './end-points'

const getAllPets: QueryFunction<{
  message: string;
  data: Pet[] | null;
}> = async () => {
  return await API.get(endpoints.pet);
}

const addPet: MutationFunction<{
  message: string;
  data: Pet
}> = async data => {
  const headers = {
    'Content-Type': 'multipart/form-data'
  }
  return await API.post(endpoints.pet, data, {headers});
}

export { getAllPets, addPet }