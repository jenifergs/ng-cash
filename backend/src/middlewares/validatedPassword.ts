import { Request, Response, NextFunction } from 'express';
import User from '../interfaces/User';

const validatedPassword = (request: Request<User>, response: Response, next: NextFunction) => {
  const { password } = request.body;
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;

  if (!regex.test(password)) {
    return response.status(400)
      .send({ error:
         'Password must be at least 8 characters' });
  }
  next();
};

export default validatedPassword;
