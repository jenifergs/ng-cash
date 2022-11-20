export interface TransactionModel {
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: string;
  createdAt: string;
}
