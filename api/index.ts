import { Router } from 'express';
import bodyParser from 'body-parser';
import athletes from './athletes';

// Instantiate and configure API Express router
const api = Router();
api.use(bodyParser.json());

// Return API status
api.get('/api/status', (_, res): void => {
  res.send({ status: 'OK' });
});

// Add athletes routes
api.use(athletes);

export default api;
