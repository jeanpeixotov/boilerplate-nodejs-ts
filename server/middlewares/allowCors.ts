import { NextFunction, Request, Response } from 'express';

export const allowCors = (req: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-amz-security-token');
  res.header('Access-Control-Expose-Headers', 'X-Token');

  if (req.method === 'OPTIONS') {
    res.send();
    return;
  }

  next();
};