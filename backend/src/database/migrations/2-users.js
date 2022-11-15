'use strict';
module.exports = {
up: async (queryInterface, Sequelize) => {
await queryInterface.createTable('user', {
id: {
  allowNull: false,
  autoIncrement: true,
  primaryKey: true,
  type: Sequelize.INTEGER
},
username: {
  type: Sequelize.STRING,
  allowNull: false,
  unique: true
},
password: {
  type: Sequelize.STRING,
},
account_id: {
  allowNull: false,
  type: Sequelize.INTEGER,

  references: {
    model: 'account',
    key: 'id',
  },
  onDelete: 'CASCADE',
},

});
},
down: async (queryInterface, Sequelize) => {
await queryInterface.dropTable('user');
}
};
