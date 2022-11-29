import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth.service';

async function validateTokenMiddleware(req: Request, _res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const authService = new AuthService();

  await authService.validateToken(authorization as string);

  next();
}
export default validateTokenMiddleware;
