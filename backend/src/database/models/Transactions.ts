import { Model, INTEGER, DECIMAL } from 'sequelize';
import Accounts from './Accounts';
import db from '.';

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
  },
);

Transactions.belongsToMany(
  Accounts,
  { as: 'debitedAccount', foreignKey: 'credited_account_id', through: 'account' },
);
Transactions.belongsToMany(
  Accounts,
  { as: 'creditedAccount', foreignKey: 'debited_account_id', through: 'account' },
);

export default Transactions;
