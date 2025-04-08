interface ErrorResponse {
  message: string;
  status: {
    code: number;
    success: boolean;
  };
  error: {
    message: string;
  };
}

export type { ErrorResponse };
