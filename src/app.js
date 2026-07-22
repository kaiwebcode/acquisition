import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import logger from '#config/logger.js';
import authRoutes from '#routes/auth.routes';
import securityMiddleware from '#middleware/security.middleware';

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  morgan('combined', {
    stream: {
      write: message => logger.info(message.trim()),
    },
  })
);

// ========================================
// Arcjet rate limiting
// ========================================
app.use(securityMiddleware);

// ========================================
// Routes
// ========================================

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from acquisition!',
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Acquisition API is running',
  });
});

app.use('/api/auth', authRoutes);

export default app;