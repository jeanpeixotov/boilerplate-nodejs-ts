import { NextFunction, Request, Response } from 'express';

import * as githubService from '../../services/github';

export const find = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await githubService.sum(1,2);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
