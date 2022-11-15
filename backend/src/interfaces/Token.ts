import User from './User';

export default interface Token {
  generateToken(payload: object): string;
  validateToken(token: string): Promise<User>;
}