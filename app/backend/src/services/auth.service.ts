import * as Jwt from 'jsonwebtoken';
import IUserPayload from '../interfaces/IUserPayload';
import UserModel from '../database/models/User.Model';
import HttpException from '../utils/http.exeception';

export default class AuthService {
  public userModel = new UserModel();
  public jwt = Jwt;

  // public async create(user: IUser): Promise<string> {
  //   const payload = await this.userModel.create(user);

  //   const token = this.generateToken(payload);
  //   return token;
  // }

  public async generateToken(payload: IUserPayload) {
    return this.jwt
      .sign(
        { id: payload.id, role: payload.role },
        process.env.JWT_SECRET as string,
        { algorithm: 'HS256', expiresIn: '7d' },
      );
  }

  public async validateToken(token: string) {
    try {
      const data = this.jwt.verify(token, process.env.JWT_SECRET as string);
      return data;
    } catch (error) {
      throw new HttpException(401, 'Token must be a valid token');
    }
  }
}
