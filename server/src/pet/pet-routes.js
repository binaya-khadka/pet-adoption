import express from 'express'
const router = express.Router();
import * as petHandler from './pet-handler.js'
import { verifyToken } from '../middleware/authMiddleware.js';


router.get('/', petHandler.fetchPets)
router.post('/', verifyToken, petHandler.addPetHandler);


export { router }