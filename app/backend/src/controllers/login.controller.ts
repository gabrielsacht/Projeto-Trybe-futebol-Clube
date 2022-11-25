import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  public loginService = new LoginService();

  public login = async (req: Request, res: Response) => {
    const token = await this.loginService.login(req.body);

    res.status(200).json({ token });
  };

  public validate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const userPayload = await this.loginService.validate(authorization as string);

    res.status(200).json({ role: userPayload.role });
  };
}
