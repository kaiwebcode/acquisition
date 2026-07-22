import 'dotenv/config';

console.log(
  'ARCJET_KEY:',
  process.env.ARCJET_KEY ? 'Loaded' : 'Missing'
);

import './server.js';