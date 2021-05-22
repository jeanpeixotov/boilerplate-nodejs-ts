import { NextFunction, Request, Response } from 'express';

import { ServiceError } from '../errors/service';

export const authorize = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) throw new ServiceError('access-denied');
    next();
  } catch (err) {
    next(err);
  }
};
