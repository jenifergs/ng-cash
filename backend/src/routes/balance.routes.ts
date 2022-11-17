import { Router } from 'express';
import BalanceController from '../controller/BalanceController';
import validatedToken from '../middlewares/validatedToken';

const balanceRouter = Router();
const balance = new BalanceController();

balanceRouter.get('/balance', validatedToken, balance.getBalance);

export default balanceRouter;
