import { Request, Response } from "express";

interface ApiResponse {
  req: Request,
  res: Response,
  message?: string,
  status: {
    code: number,
    success: boolean,
  }
}

interface ApiSuccess extends ApiResponse {
  data?: any,
}

interface ApiFail extends ApiResponse {
  error?: any,
}

const apiSuccess = ({ req, res, data, message = 'Success',
  status = {
    code: 200,
    success: true,
  },
}: ApiSuccess) => {
  console.log({
    message,
    method: req?.method,
    route: req?.url,
  })
  return res.status(status.code || 200).json({ message, status, data })
}

const apiFail = ({ req, res, error, message = 'Error Occurred',
  status = {
    code: 400,
    success: false,
  },
}: ApiFail) => {
  console.log(error);
  return res.status(status.code || 400).json({
    message,
    status: {
      code: status.code || 400,
      success: status.success || false,
    },
    error,
  })
}

export { apiSuccess, apiFail }