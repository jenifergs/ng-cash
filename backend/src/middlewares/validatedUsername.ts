import { Request, Response, NextFunction } from 'express';
import User from '../interfaces/User';

const validatedUsername = (req: Request<User>, res: Response, next: NextFunction) => {
  const { username } = req.body;
  if (username.length < 3) {
    return res.status(400).send({ error: 'Username must be at least 3 characters long' });
  }
  next();
};

export default validatedUsername;
