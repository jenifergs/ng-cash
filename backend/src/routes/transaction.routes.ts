import { Router } from 'express';
import TransactionController from '../controller/TransactionController';
import validatedToken from '../middlewares/validatedToken';

const transactionRouter = Router();
const transaction = new TransactionController();

transactionRouter.get('/transactions/query', validatedToken, transaction.queryTransactions);
transactionRouter.get('/transactions', validatedToken, transaction.getAllTransactions);
transactionRouter.post('/transfer', validatedToken, transaction.transfer);

export default transactionRouter;
