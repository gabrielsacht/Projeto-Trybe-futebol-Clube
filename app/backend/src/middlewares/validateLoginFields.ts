import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/http.exeception';

export default function validateLoginFields(req: Request, _res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email || !password) throw new HttpException(400, 'All fields must be filled');

  next();
}
