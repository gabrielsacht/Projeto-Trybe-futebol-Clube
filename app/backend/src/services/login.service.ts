import { compareSync } from 'bcryptjs';
import UserModel from '../database/models/User.Model';
import AuthService from './auth.service';
import HttpException from '../utils/http.exeception';
import ILoginBody from '../interfaces/ILoginBody';
import IUserPayload from '../interfaces/IUserPayload';

export default class LoginService {
  public authService = new AuthService();

  public async login(body: ILoginBody): Promise<string> {
    const { email, password } = body;
    const user = await UserModel.findOne({
      where: { email },
    });

    if (!user || !compareSync(password, user.password)) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const userPayload = { id: user.id, role: user.role };
    const token = await this.authService.generateToken(userPayload);
    return token;
  }

  public async validate(token: string) {
    const data = await this.authService.validateToken(token);
    return data as IUserPayload;
  }
}
