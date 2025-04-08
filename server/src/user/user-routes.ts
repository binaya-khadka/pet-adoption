import express, { NextFunction } from 'express';

import { userHandler } from '.';
import { Request, Response } from 'express';
import { verifyToken } from '../middleware';

const userRouter = express.Router();

userRouter.get('/', verifyToken, (req: Request, res: Response) => {
  userHandler.getAllUserHandler(req, res);
});

userRouter.post('/', (req: Request, res: Response) => {
  userHandler.createUserHandler(req, res);
});

userRouter.post('/login', (req: Request, res: Response) => {
  userHandler.loginHandler(req, res);
});

export { userRouter };
