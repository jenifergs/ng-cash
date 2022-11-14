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
},
password: {
type: STRING,
allowNull: false,
},
accountId: {
type: INTEGER,
allowNull: false,
references: {
	model: 'accounts',
	key: 'id',
},
},
},
{
tableName: 'users',
underscored: true,
sequelize: db,
timestamps: false,
}
);

Users.belongsTo(Accounts, { as: 'accountId', foreignKey: 'id' });
export default Users;