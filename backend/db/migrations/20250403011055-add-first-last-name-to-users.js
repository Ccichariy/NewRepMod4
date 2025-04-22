'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      { tableName: 'Users', ...options },
      'firstName',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'First'
      }
    );

    await queryInterface.addColumn(
      { tableName: 'Users', ...options },
      'lastName',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Last'
      }
    );
  },

  async down(queryInterface, Sequelize) {
    const options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;
    }

    await queryInterface.removeColumn({ tableName: 'Users', ...options }, 'firstName');
    await queryInterface.removeColumn({ tableName: 'Users', ...options }, 'lastName');
  }
};
