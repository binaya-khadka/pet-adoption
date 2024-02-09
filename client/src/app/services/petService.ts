import { MutationFunction, QueryFunction } from "react-query";
import { Pet } from "../../interfaces";
import { API } from "../lib";

const getAllPets: QueryFunction<{
  message: string;
  data: Pet[] | null;
}> = async () => {
  return await API.get('/pet');
}

const addPet: MutationFunction<{
  message: string;
  data: Pet
}> = async data => {
  return await API.post('/pet', data)
}

export { getAllPets, addPet }