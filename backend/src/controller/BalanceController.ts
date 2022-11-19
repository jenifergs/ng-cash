import { Request, Response } from 'express';
import BalanceService from '../services/BalanceService';
import JwtUtil from '../utils/JwtUtil';

export default class BalanceController {
  public service: BalanceService;

  constructor(service?: BalanceService) {
    this.service = service || new BalanceService(new JwtUtil());
  }

  getBalance = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    try {
      const balance = await this.service.getBalance(authorization as string);
      return res.status(200).json({ balance });
    } catch (error) {
      const errorMapped = error as Error;
      return res.status(400).json({ error: errorMapped.message });
    }
  };
}
