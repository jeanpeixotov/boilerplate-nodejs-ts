import { NextFunction, Request, Response } from 'express';

import * as githubService from '../../services/github';

export const find = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await githubService.getFollowers(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
