import Accounts from './Accounts';
import { Model, INTEGER } from 'sequelize';
import db from '.';
import { DECIMAL } from 'sequelize';

class Transactions extends Model {
id!: number;
debitedAccountId!: number;
creditedAccountId !: number;
value!: number;
createdAt: Date;
}

Transactions.init(
{
id: {
type: INTEGER,
autoIncrement: true,
primaryKey: true,
},

debitedAccountId: {
type: INTEGER,
allowNull: false,
references: {
    model: 'account',
    key: 'id',
},
},
creditedAccountId: {
type: INTEGER,
allowNull: false,
references: {
    model: 'account',
    key: 'id',
},
},
value: {
type: DECIMAL,
allowNull: false,
},
},
{
tableName: 'transactions',
underscored: true,
sequelize: db,
timestamps: true,
createdAt: true,
updatedAt: false,
}
);

Transactions.belongsTo(Accounts, { as: 'debitedAccount', foreignKey: 'debitedAccountId' });
Transactions.belongsTo(Accounts, { as: 'creditedAccount', foreignKey: 'creditedAccountId' });

export default Transactions;