import logger from '#config/logger.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1d';

export const jwttoken = {
  sign: payload => {
    try {
      return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    } catch (e) {
      logger.error('Error signing JWT:', e);
      throw new Error('Error signing JWT');
    }
  },
  verify: token => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (e) {
      logger.error('Error verifying JWT:', e);
      throw new Error('Error verifying JWT');
    }
  },
};
