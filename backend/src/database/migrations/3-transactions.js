/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-lines-per-function */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      debited_account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        references: {
          model: 'account',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      credited_account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        references: {
          model: 'account',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      value: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('transactions');
  },
};
