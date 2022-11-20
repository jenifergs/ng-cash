import { Request, Response, NextFunction } from 'express';
import JwtUtil from '../utils/JwtUtil';

const validatedToken = async (req: Request, res: Response, next: NextFunction) => {
  const validated = new JwtUtil();
  const { authorization } = req.headers;
  const token = authorization?.split(' ')[1];

  req.headers.authorization = token;

  if (!token) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  try {
    await validated.validateToken(token);
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default validatedToken;
