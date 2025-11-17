import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../../core/types/http-statuses';

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export const adminGuardMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers.authorization) {
    return res.sendStatus(HttpStatus.Unauthorized);
  }

  const [authType, token] = req.headers.authorization.split(' ');

  if (authType !== 'Basic') {
    return res.sendStatus(HttpStatus.Unauthorized);
  }

  const adminCredentials = Buffer.from(token, 'base64').toString('utf-8');
  const [adminUsername, adminPassword] = adminCredentials.split(':');

  if (adminUsername !== ADMIN_USERNAME || adminPassword !== ADMIN_PASSWORD) {
    return res.sendStatus(HttpStatus.Unauthorized);
  }

  next();
};
