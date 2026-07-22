import aj from '#config/arcjet.js';
import logger from '#config/logger.js';

const securityMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    logger.info('Arcjet decision', {
      allowed: decision.isAllowed(),
      denied: decision.isDenied(),
      reason: decision.reason,
      ip: req.ip,
      path: req.path,
      method: req.method,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        logger.warn('Rate limit exceeded', {
          ip: req.ip,
          path: req.path,
          method: req.method,
        });

        return res.status(429).json({
          error: 'Too Many Requests',
          message: 'Too many requests. Please try again later.',
        });
      }

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Request blocked by Arcjet.',
      });
    }

    next();
  } catch (error) {
    logger.error('Error in Arcjet middleware:', error);

    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong with Arcjet.',
    });
  }
};

export default securityMiddleware;