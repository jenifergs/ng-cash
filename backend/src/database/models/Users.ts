import Accounts from './Accounts';
import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
id!: number;
username!: string;
password!: string;
accountId!: number;
}

Users.init(
{
id: {
type: INTEGER,
autoIncrement: true,
primaryKey: true,
},
username: {
type: STRING,
allowNull: false,
unique: true,
},
password: {
type: STRING,
allowNull: false,
},
accountId: {
type: INTEGER,
allowNull: false,
references: {
	model: 'account',
	key: 'id',
},
},
},
{
tableName: 'user',
underscored: true,
sequelize: db,
timestamps: false,
}
);

Users.belongsTo(Accounts, { as: 'account', foreignKey: 'accountId' });
export default Users;