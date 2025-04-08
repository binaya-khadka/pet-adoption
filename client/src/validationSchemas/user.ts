import { z } from 'zod';

const login = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email' })
    .min(3, 'Invalid Email')
    .max(250, 'Invalid Email'),
  password: z.string().min(8, 'Password should be at least 8 characters long')
});

const signup = z.object({
  name: z
    .string()
    .min(3, 'Name should be at least 3 characters long')
    .max(20, "Name shouldn't exceed 20 characters"),
  email: z
    .string()
    .email({ message: 'Invalid email' })
    .min(3, 'Invalid Email')
    .max(250, 'Invalid Email'),
  password: z.string().min(8, 'Password should be at least 8 characters long')
});

export { login, signup };
