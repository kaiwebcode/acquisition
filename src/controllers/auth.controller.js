import logger from '#config/logger.js';
import { createUser, loginUser } from '#services/auth.service';

import { cookies } from '#utils/cookies';
import { formatValidationErrors } from '#utils/format';
import { jwttoken } from '#utils/jwt';
import {
  signupSchema,
  loginSchema,
} from '#validations/auth.validation';

export const signup = async (req, res, next) => {
  try {
    const validationResult = signupSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: formatValidationErrors(validationResult.error),
      });
    }

    const { name, email, password, role } = validationResult.data;

    const user = await createUser({
      name,
      email,
      password,
      role,
    });

    const token = jwttoken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    cookies.set(res, 'token', token);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user,
      token,
    });
  } catch (error) {
    logger.error(error);

    if (error.message === 'User with this email already exists') {
      return res.status(400).json({
        error: error.message,
      });
    }

    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const validationResult = loginSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: formatValidationErrors(validationResult.error),
      });
    }

    const { email, password } = validationResult.data;

    const user = await loginUser({
      email,
      password,
    });

    const token = jwttoken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    cookies.set(res, 'token', token);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error(error);

    if (error.message === 'Invalid email or password') {
      return res.status(401).json({
        error: error.message,
      });
    }

    next(error);
  }
};

export const logout = async (req, res) => {
  cookies.clear(res, 'token');

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};