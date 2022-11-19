/* eslint-disable class-methods-use-this */
import Users from '../database/models/Users';
import Account from '../database/models/Accounts';
import JwtUtil from '../utils/JwtUtil';

export default class BalanceService {
  public jwtUtil: JwtUtil;

  constructor(jwtUtil?: JwtUtil) {
    this.jwtUtil = jwtUtil || new JwtUtil();
  }

  getBalance = async (token: string) => {
    const userID = await this.jwtUtil.getIdUSer(token);
    const user = await Users.findOne({ where: { id: userID } });
    if (!user) throw new Error('User not found');
    const { accountId } = user;
    const account = await Account.findOne({ where: { id: accountId } });
    if (!account) throw new Error('Account not found');
    const { balance } = account;
    return balance;
  };
}
