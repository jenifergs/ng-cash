module.exports = {
async up (queryInterface, Sequelize) {
await queryInterface.createTable('transactions', {
id: {
  allowNull: false,
  autoIncrement: true,
  primaryKey: true,
  type: Sequelize.INTEGER
},
debitedAccountId: {
  type: Sequelize.INTEGER,
  allowNull: false,
  unique: true,
  references: {
    model: 'account',
    key: 'id',
  },
  onDelete: 'CASCADE',
},
creditedAccountId: {
  type: Sequelize.INTEGER,
  allowNull: false,
  unique: true,
  references: {
    model: 'account',
    key: 'id',
  },
  onDelete: 'CASCADE',
},
value: {
  allowNull: false,
  type: Sequelize.DECIMAL(10, 2),
},
createdAt: {
  allowNull: false,
  type: Sequelize.DATE
},
});
},

async down (queryInterface, Sequelize) {
  await queryInterface.dropTable('transactions');
}
};
