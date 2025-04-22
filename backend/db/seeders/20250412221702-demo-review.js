'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Reviews';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: 'This was an awesome spot!',
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Could use some work.',
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2] }
    });
  }
};
