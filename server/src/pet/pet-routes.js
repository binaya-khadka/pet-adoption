import express from 'express'
const router = express.Router();
import * as petHandler from './pet-handler.js'
import { verifyToken } from '../middleware/authMiddleware.js';
import { upload } from '../utils/upload.js';

// Route for fetching all pets
router.get('/', petHandler.fetchPets)
// Route for adding a new pet

router.post('/', upload.single('image'), verifyToken, petHandler.addPetHandler);

// Route for updating a pet
// router.put('/update/:id', verifyToken, petHandler.updatePetHandler);

// Route for deleting a pet
// router.delete('/:id', verifyToken, petHandler.deletePetHandler)

// Route for adopting a pet 
router.put('/adopt/:id', verifyToken, petHandler.adoptPetHandler);

// Route for fetching a single pet
router.get('/:id', petHandler.fetchSinglePet);

export { router }