import arcjet, { slidingWindow } from '@arcjet/node';

const aj = arcjet({
  key: process.env.ARCJET_KEY,

  rules: [
    slidingWindow({
      mode: 'LIVE',
      interval: '10s',
      max: 5,
      name: 'api-rate-limit',
    }),
  ],
});

export default aj;