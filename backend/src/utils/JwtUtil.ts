import { sign, verify } from 'jsonwebtoken';
import User from '../interfaces/User';
import Token from '../interfaces/Token';

export default class JwtUtil implements Token {
  private secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'secret';
  }

  validateToken(token: string): Promise<User> {
    return verify(token, this.secret) as Promise<User>;
  }

  generateToken(payload: object) {
    return sign(payload, this.secret, { expiresIn: '24h' });
  }
}