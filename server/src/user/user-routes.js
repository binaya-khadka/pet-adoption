import express from 'express'
import * as userHandler from './user-handler.js'

const router = express.Router();

router.get('/', userHandler.getAllUserHandler)
router.post('/', userHandler.createUserHandler)

router.post('/login', userHandler.loginHandler);

export { router }