import { DECIMAL, Model, INTEGER } from 'sequelize';
import db from '.';

class Account extends Model {
  id!: number;
  balance!: number;
}

Account.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    balance: {
      type: DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: 'account',
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);

export default Account;
