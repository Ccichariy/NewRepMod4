'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'ReviewImages';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'https://example.com/test.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete(options, null, {});
  }
};
