import express from 'express'
const router = express.Router();
import * as petHandler from './pet-handler.js'


router.get('/', petHandler.fetchPets)
router.post('/', petHandler.addPetHandler);


export { router }