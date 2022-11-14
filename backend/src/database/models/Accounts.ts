import { Model, INTEGER } from 'sequelize';
import db from '.';

class Accounts extends Model {
id!: number;
balance!: number;
}

Accounts.init(
{
id: {
type: INTEGER,
autoIncrement: true,
primaryKey: true,
},
balance: {
type: INTEGER,
allowNull: false,
},
},
{
tableName: 'accounts',
underscored: true,
sequelize: db,
timestamps: false,
}
);

export default Accounts;