import { Request, Response } from 'express';
import User from '../interfaces/User';
import UserService from '../services/UserService';
import JwtUtil from '../utils/JwtUtil';

export default class UserController {
  public service: UserService;

  constructor(service?: UserService) {
    this.service = service || new UserService(new JwtUtil());
  }

 createUser = async (req: Request<User>, res: Response)=> {
    const { username, password } = req.body;

    try {
      const token = await this.service.createUser(username, password);
      return res.status(200).json({ token });
    } catch (error) {
      const erroMapeado = error as Error;
      return res.status(400).json({ message: erroMapeado.message });
    }
  }
}