import { NextFunction, Request, Response } from 'express';

import { isProduction } from '../settings';

export const notFound = (_req: Request, res: Response, _next: NextFunction): any => {
  return res.status(404).json('Nenhuma rota encontrada');
};

export const parser = (err: any, req: Request, res: Response, next: NextFunction): any => {

  const errors: any = {
    redirect: 302,
    'bad-request': 400,
    'access-denied': 401,
    forbidden: 403,
    'not-found': 404,
    'internal-error': 500
  };

  err.status = errors[err.message];

  if (typeof err === 'string') {
    err = { message: err };
  }

  if (isProduction) return productionError(err, req, res, next);
  return developmentError(err, req, res, next);
};

export const developmentError = (err: any, _req: Request, res: Response, _next: NextFunction): void => {
  const status = err.status || 500;
  const errObj = {
    action: err.data && err.data.action ? err.data.action : err.action,
    message: err.data && err.data.msg ? err.data.msg : err.message,
    status
  };

  if (!errObj.action) delete errObj.action;
  res.status(status).send(errObj || 'Internal Server Error');
};

export const productionError = async (err: any, req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const status = err.status || 500;

  if (status === 500) {
    const user: any = req.headers.user;
    err.errorData = {
      user: user.codigoOrigem.toString(),
      req: {
        method: req.method,
        url: req.originalUrl,
        queryString: req.params,
        body: req.body,
      }
    };
  }

  const errObj = {
    action: err.data && err.data.action ? err.data.action : err.action,
    message: err.data && err.data.msg ? err.data.msg : err.message,
    status
  };

  if (!errObj.action) delete errObj.action;

  res.status(status).send(errObj || 'Internal Server Error');
};