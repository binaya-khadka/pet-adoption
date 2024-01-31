import { apiMethodUtils } from "../utils/index.js"
import * as petService from './pet-service.js'

const addPetHandler = async (req, res) => {
  const { name, age, breed, onAdoptionByUser } = req.body;

  const payload = { name, age, breed, onAdoptionByUser }

  try {
    const pet = await petService.addPet(payload);
    return apiMethodUtils.apiSuccess({ req, res, data: pet, message: 'Successfully added new pet' })
  } catch (err) {
    return apiMethodUtils.apiFail({ req, res, error: err, message: 'Something went wrong' })
  }
}

const fetchPets = async (req, res) => {
  try {
    const pets = await petService.getAllPets();
    return apiMethodUtils.apiSuccess({ req, res, data: pets, message: 'Successfully fetched pets' })
  } catch (err) {
    return apiMethodUtils.apiFail({ req, res, error: err, message: 'Something went wrong' })
  }
}

export {
  addPetHandler,
  fetchPets,
}