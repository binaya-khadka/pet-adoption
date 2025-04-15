import { Request, Response } from 'express';
import { httpStatus } from '../constants';

interface ApiResponse {
  req: Request;
  res: Response;
  message?: string;
  status?: {
    code: number;
    success: boolean;
  };
}

interface ApiSuccess extends ApiResponse {
  data?: any;
}

interface ApiFail extends ApiResponse {
  error?: any;
}

const apiSuccess = ({
  req,
  res,
  data,
  message = 'Success',
  status = {
    code: httpStatus.OK,
    success: true
  }
}: ApiSuccess) => {
  console.log({
    message,
    method: req?.method,
    route: req?.url
  });
  return res
    .status(status?.code || httpStatus.OK)
    .json({ message, status, data });
};

const apiFail = ({
  req,
  res,
  error,
  message = 'Error Occurred',
  status = {
    code: httpStatus.BAD_REQUEST,
    success: false
  }
}: ApiFail) => {
  console.log({
    message,
    method: req?.method,
    route: req?.url
  });
  return res.status(status.code || httpStatus.BAD_REQUEST).json({
    message,
    status,
    error
  });
};

export { apiSuccess, apiFail };
