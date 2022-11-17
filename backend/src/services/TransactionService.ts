/* eslint-disable class-methods-use-this */
import Users from '../database/models/Users';
import Account from '../database/models/Accounts';
import JwtUtil from '../utils/JwtUtil';
import Transactions from '../database/models/Transactions';

export default class TransactionService {
  public jwtUtil: JwtUtil;

  constructor(jwtUtil?: JwtUtil) {
    this.jwtUtil = jwtUtil || new JwtUtil();
  }

  getAllTransactions = async (token: string) => {
    const userToken = await this.jwtUtil.validateToken(token);
    const { id } = userToken;
    const user = await Users.findOne({ where: { id } });
    if (!user) throw new Error('User not found');

    const { accountId } = user;
    const account = await Account.findOne({ where: { id: accountId } });
    if (!account) throw new Error('Account not found');

    const creditedTransactions = await Transactions
      .findAll({ where: { creditedAccountId: account.dataValues.id } });
    const debitedtransactions = await Transactions
      .findAll({ where: { debitedAccountId: account.dataValues.id } });
    const result = [...creditedTransactions, ...debitedtransactions];
    return result;
  };

  getUser = async (idUser: number | undefined) => {
    const user = await Users.findOne({ where: { id: idUser } });
    if (!user) { throw new Error('User not found'); }
    return user;
  };

  queryTransactions = async (
    token: string,
    createdAt?: string,
    cashIn?: string,
    cashOut?: string,
  ) => {
    const idUser = await this.jwtUtil.getIdUSer(token);
    const user = await this.getUser(idUser);
    const { accountId } = user;
    const account = await Account.findOne({ where: { id: accountId } });
    if (!account) throw new Error('Account not found');
    let teste: Transactions[] = [];

    teste = await this.getTransactions(cashIn, account, cashOut, createdAt);

    return teste;
  };

  getTransactions = async (
    cashIn: string | undefined,
    account: Account,
    cashOut: string | undefined,
    createdAt: string | undefined,
  ) => {
    let transaction: Transactions[] = [];
    transaction.push(...await this.getCrediteds(cashIn, account, transaction));
    transaction.push(...await this.getDebiteds(cashOut, account, transaction));

    if (createdAt) {
      const transactionDate = transaction.filter((filteredTransaction) => filteredTransaction
        .dataValues.createdAt.toISOString().includes(createdAt));
      transaction = transactionDate;
      return transaction;
    }
    return transaction;
  };

  getCrediteds = async (
    cashIn: string | undefined,
    account: Account,
    baseTransactions: Transactions[],
  ) => {
    if (cashIn === 'true') {
      const transactions = await Transactions
        .findAll({ where: { creditedAccountId: account.dataValues.id } });
      return [...baseTransactions, ...transactions];
    }
    return baseTransactions;
  };

  getDebiteds = async (
    cashOut: string | undefined,
    account: Account,
    baseTransactions: Transactions[],
  ) => {
    if (cashOut === 'true') {
      const transaction2 = await Transactions
        .findAll({ where: { debitedAccountId: account.dataValues.id } });
      return [...baseTransactions, ...transaction2];
    }
    return baseTransactions;
  };

  transfer = async (token: string, cashIn: string, cashOut: string, value: number) => {
    const idUser = await this.jwtUtil.getIdUSer(token);
    const cashout = await Users.findOne({ where: { username: cashOut } });
    const cashin = await Users.findOne({ where: { username: cashIn } });
    if (!cashout || !cashin) throw new Error('not found');
    if (idUser !== cashout.dataValues.id) throw new Error('not authorized');

    if (cashin.dataValues.accountId === cashout.dataValues.accountId) {
      throw new Error('You can\'t transfer to yourself');
    }
    const { accountIn, accountOut } = await this
      .getAccount(cashin.dataValues.accountId, cashout.dataValues.accountId);
    if (!accountIn || !accountOut) throw new Error('Account not found');
    const { balance: balanceIn } = accountIn.dataValues;
    const { balance: balanceOut } = accountOut.dataValues;
    if (balanceIn < value) throw new Error('Insufficient funds');
    const newBalance = Number(balanceIn) - value;
    await Account.update({ balance: newBalance }, { where: { id: accountIn.dataValues.id } });
    const newbalanceOut = Number(balanceOut) + value;

    return this.updateBalance(newbalanceOut, accountOut, accountIn, value);
  };

  getAccount = async (credited: number, debited: number) => {
    const accountIn = await Account.findOne({ where: { id: credited } });
    const accountOut = await Account.findOne({ where: { id: debited } });
    return { accountIn, accountOut };
  };

  updateBalance = async (
    newbalanceOut: number,
    accountOut: Account,
    accountIn: Account,
    value: number,
  ) => {
    await Account.update({ balance: newbalanceOut }, { where: { id: accountOut.dataValues.id } });
    const transaction = await Transactions
      .create({ creditedAccountId: accountIn.dataValues.id,
        debitedAccountId: accountOut.dataValues.id,
        value });
    return { response: 'Transfer successful', transaction };
  };
}
