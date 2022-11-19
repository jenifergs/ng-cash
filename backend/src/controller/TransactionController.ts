import { ok } from 'assert';
import { Request, Response } from 'express';
import TransactionService from '../services/TransactionService';
import JwtUtil from '../utils/JwtUtil';

export default class TransactionController {
  public service: TransactionService;

  constructor(service?: TransactionService) {
    this.service = service || new TransactionService(new JwtUtil());
  }

  transfer = async (req: Request, res: Response) => {
    const { cashIn, cashOut, value } = req.body;
    const { authorization } = req.headers;
    try {
      ok(authorization);
      const transfer = await this.service.transfer(authorization as string, cashIn, cashOut, value);
      return res.status(200).json({ transfer: transfer });
    } catch (error) {
      const errorMapped = error as Error;
      return res.status(400).json({ error: errorMapped.message });
    }
  };

  getAllTransactions = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    try {
      const transaction = await this.service.getAllTransactions(authorization as string);
      return res.status(200).json({ transactions: transaction });
    } catch (error) {
      const errorMapped = error as Error;
      return res.status(400).json({ error: errorMapped.message });
    }
  };

  queryTransactions = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { createdAt, cashIn, cashOut } = req.query;
    try {
      const transaction = await this.service
        .queryTransactions(
          authorization as string,
          createdAt as string,
          cashIn as string,
          cashOut as string,
        );
      return res.status(200).json({ transactions: transaction });
    } catch (error) {
      const errorMapped = error as Error;
      return res.status(400).json({ message: errorMapped.message });
    }
  };
}
