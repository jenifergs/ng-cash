import { compareSync } from 'bcryptjs';
import Users from '../database/models/Users';
import Accounts from '../database/models/Accounts';
import Token from '../interfaces/Token';

export default class UserService {
private jwtUtil: Token;

constructor(jwtUtil: Token) {
this.jwtUtil = jwtUtil;
}

createUser = async (username: string, password: string) => {
const usern = await Users.findOne({ where: { username } });
if (usern) {
throw new Error('Username already exists');
}
const account = await Accounts.create({ balance: 100 });
const user = await Users.create({ username, password, accountId: account.dataValues.id });

const token = this.jwtUtil.generateToken({ username: user.dataValues.username, id: user.dataValues.id });
return token;
}
}

