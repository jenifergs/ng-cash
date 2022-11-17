import Users from '../database/models/Users';
import Accounts from '../database/models/Accounts';
import Token from '../interfaces/Token';
import PasswordUtil from '../utils/PasswordUtil';

export default class UserService {
  private jwtUtil: Token;
  private passwordUtil: PasswordUtil;

  constructor(jwtUtil: Token, passwordUtil: PasswordUtil) {
    this.jwtUtil = jwtUtil;
    this.passwordUtil = passwordUtil;
  }

  createUser = async (username: string, password: string) => {
    const usern = await Users.findOne({ where: { username } });
    if (usern) {
      throw new Error('Username already exists');
    }
    const hash = this.passwordUtil.hashPassword(password);
    const account = await Accounts.create({ balance: 100 });
    const user = await Users.create({ username, password: hash, accountId: account.dataValues.id });

    const token = this
      .jwtUtil.generateToken({ username: user.dataValues.username, id: user.dataValues.id });
    return token;
  };

  loginUser = async (username: string, password: string) => {
    const user = await Users.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    const passwordMatch = this.passwordUtil.comparePassword(password, user.dataValues.password);
    if (!passwordMatch) {
      throw new Error('Invalid password or username');
    }
    const token = this
      .jwtUtil.generateToken({ username: user.dataValues.username, id: user.dataValues.id });
    return token;
  };
}
