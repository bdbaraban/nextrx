import { NextFunction, Request, Response } from 'express';

/**
 * Block non-authenticated requests on API.
 * @param req { Request } - Incoming HTTP request.
 * @param res { Response } - Outgoing HTTP response.
 * @param next { NextFunction } - Express callback.
 */
export default (req: Request, res: Response, next: NextFunction): void => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send(401);
};
