'use strict';
module.exports = {
up: async (queryInterface, Sequelize) => {
await queryInterface.createTable('users', {
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
accountId: {
  allowNull: false,
  type: Sequelize.INTEGER,

  references: {
    model: 'accounts',
    key: 'id',
  },
  onDelete: 'CASCADE',
},

});
},
down: async (queryInterface, Sequelize) => {
await queryInterface.dropTable('users');
}
};
