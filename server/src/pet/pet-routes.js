import express from 'express'
import { apiMethodUtils } from '../utils/index.js';
import db from '../lib/db.js'
import { Pet } from './index.js'

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    db();
    const pets = await Pet.getAllPets();
    return apiMethodUtils.apiSuccess({ req, res, data: pets, message: "Data Fetched Successfully" })
  } catch (error) {
    console.log(error)
    return apiMethodUtils.apiFail({ req, res, error: error, message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    db();
    const { name, age, breed, isAdopted, onAdoptionByUser, adoptedByUser } = req.body;
    const payload = { name, age, breed, onAdoptionByUser };
    const pet = await Pet.addPet(payload);
    console.log(pet);
    return apiMethodUtils.apiSuccess({ req, res, data: pet, message: "Successfully added new pet" })
  } catch (error) {
    console.log(error)
    return apiMethodUtils.apiFail({ req, res, error: error, message: 'Something went wrong' })
  }
})


export { router }