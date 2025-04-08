import express, { Request, Response } from 'express';
import { petHandler } from '.';
import { upload } from '../utils';
import { verifyToken } from '../middleware';

const petRouter = express.Router();

petRouter.get('/', (req: Request, res: Response) => {
  petHandler.fetchPets;
});

petRouter.post(
  '/',
  upload.single('image'),
  verifyToken,
  (req: Request, res: Response) => {
    petHandler.addPetHandler;
  }
);

// Route for updating a pet
// router.put('/update/:id', verifyToken, petHandler.updatePetHandler);

// Route for deleting a pet
// router.delete('/:id', verifyToken, petHandler.deletePetHandler)

// Route for adopting a pet
petRouter.put('/adopt/:id', verifyToken, (req: Request, res: Response) => {
  petHandler.adoptPetHandler;
});

// Route for fetching a single pet
petRouter.get('/:id', (req: Request, res: Response) => {
  petHandler.fetchSinglePet;
});

export { petRouter };
