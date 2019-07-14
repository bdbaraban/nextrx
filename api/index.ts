import { Router } from 'express';
import bodyParser from 'body-parser';
import athletes from './athletes';

const api = Router();

api.use(bodyParser.json());

api.get('/api/status', (_, res): void => {
  res.send({ status: 'OK' });
});

api.use(athletes);

export default api;
