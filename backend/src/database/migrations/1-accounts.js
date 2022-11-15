module.exports = {
async up (queryInterface, Sequelize) {
await queryInterface.createTable('account', {
id: {
  allowNull: false,
  autoIncrement: true,
  primaryKey: true,
  type: Sequelize.INTEGER
},
balance: {
  type: Sequelize.DECIMAL(10, 2),
  allowNull: false,
},
});
},

async down (queryInterface, Sequelize) {
await queryInterface.dropTable('account');
}
};
