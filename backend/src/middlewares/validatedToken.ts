import { Request, Response, NextFunction } from 'express';
import JwtUtil from '../utils/JwtUtil';

const validatedToken = async (req: Request, res: Response, next: NextFunction) => {
  const validated = new JwtUtil();
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  try {
    await validated.validateToken(authorization);
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default validatedToken;
