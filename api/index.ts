import { NextFunction, Request, Router, Response } from 'express';
import bodyParser from 'body-parser';
import athletes from './athletes';

const api = Router();

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send(401);
};

api.use(bodyParser.json());

api.get('/api/status', (_, res): void => {
  res.send({ status: 'OK' });
});

api.use(athletes);

export default api;
