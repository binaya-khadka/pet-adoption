import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { userRepository } from '../user';
import { apiMethodUtils } from '../utils';
import { serverConfig } from '../lib';

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token)
      throw {
        message: 'Unauthorized'
      };
    const decodedData = jwt.verify(token, serverConfig?.jwtSecret);

    if (typeof decodedData === 'string' || !decodedData) {
      throw {
        message: 'Unauthorized',
        status: {
          code: 401,
          success: false
        }
      };
    }

    const user = await userRepository.fetchUserById(decodedData.id);

    if (!user) {
      throw {
        message: 'User not found'
      };
    }

    next();
  } catch (err) {
    console.log(err);
    apiMethodUtils.apiFail({
      req,
      res,
      error: err,
      message: 'Something went wrong',
      status: {
        code: 401,
        success: false
      }
    });
  }
};

export { verifyToken };
