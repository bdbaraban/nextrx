import { Router } from 'express';
import bodyParser from 'body-parser';
import athletes from './athletes';
import lifts from './lifts';
import workouts from './workouts';

// Instantiate and configure API Express router
const api = Router();
api.use(bodyParser.json());

// Return API status
api.get('/api/status', (_, res): void => {
  res.send({ status: 'OK' });
});

// Add athletes routes
api.use(athletes);

// Add lifts routes
api.use(lifts);

// Add workouts routes
api.use(workouts);

export default api;
