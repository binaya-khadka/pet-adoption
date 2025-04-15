import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { apiMethodUtils } from '../utils';
import { userService } from '.';
import { httpStatus } from '../constants';
import { userValidationSchema } from '../validationSchema';
import { ZodError } from 'zod';

const getAllUserHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await userService.getAllUser();
  return apiMethodUtils.apiSuccess({
    req,
    res,
    data: user,
    message: 'Successfully fetched data'
  });
};

const createUserHandler = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const payload = { name, email, password: hashedPassword };

  try {
    const validatedData = await userValidationSchema.signup.parse(payload);

    const existingUser = await userService.getUserByEmail(email);

    if (existingUser) {
      throw {
        message: 'User already exists',
        status: {
          code: httpStatus.BAD_REQUEST,
          success: false
        }
      };
    }

    const user = await userService.register(payload);

    return apiMethodUtils.apiSuccess({
      req,
      res,
      data: user,
      message: 'Successfully created user'
    });
  } catch (err) {
    console.log(err);

    if (err instanceof ZodError) {
      const errorMessages = err.errors.map((error) => ({
        field: error.path[0],
        message: error.message
      }));
      return apiMethodUtils.apiFail({
        req,
        res,
        error: {
          message: errorMessages,
          status: {
            code: httpStatus.UNPROCESSABLE_ENTITY,
            success: false
          }
        },
        message: 'Validation Failed'
      });
    }

    return apiMethodUtils.apiFail({
      req,
      res,
      error: err,
      message: 'Something went wrong'
    });
  }
};

const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const payload = { email, password };

  try {
    const validatedData = await userValidationSchema.login.parse(payload);
    const user = await userService.login(payload);

    return apiMethodUtils.apiSuccess({
      req,
      res,
      data: user,
      message: 'Successfully logged in'
    });
  } catch (err) {
    console.log(err);
    if (err instanceof ZodError) {
      const errorMessages = err.errors.map((error) => ({
        field: error.path[0],
        message: error.message
      }));

      return apiMethodUtils.apiFail({
        req,
        res,
        error: {
          message: errorMessages,
          status: {
            code: httpStatus.UNPROCESSABLE_ENTITY,
            success: false
          }
        },
        message: 'Validation Failed'
      });
    }
    return apiMethodUtils.apiFail({
      req,
      res,
      error: err,
      message: 'Something went wrong'
    });
  }
};

export { getAllUserHandler, createUserHandler, loginHandler };
