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
    model: 'accounts',
    key: 'id',
},
},
creditedAccountId: {
type: INTEGER,
allowNull: false,
references: {
    model: 'accounts',
    key: 'id',
},
},
value: {
type: DECIMAL,
allowNull: false,
},
},
{
tableName: 'users',
underscored: true,
sequelize: db,
timestamps: true,
createdAt: true,
updatedAt: false,
}
);

Transactions.belongsTo(Accounts, { as: 'debitedAccountId', foreignKey: 'id' });
Transactions.belongsTo(Accounts, { as: 'creditedAccountId', foreignKey: 'id' });

export default Transactions;