import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2, 'Name is required').max(255).trim(),

  email: z
    .string()
    .email('Invalid email address')
    .max(200)
    .trim()
    .toLowerCase(),

  password: z.string().min(6).max(50),

  role: z.enum(['admin', 'user']).default('user'),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email()
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(6)
    .max(50),
});