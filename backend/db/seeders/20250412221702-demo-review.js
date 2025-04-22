'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Reviews';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Lookup Spot IDs and User IDs dynamically
    const demoUser = await queryInterface.rawSelect(
      { tableName: 'Users', schema: options.schema },
      { where: { username: 'Demo-lition' } },
      ['id']
    );

    const spot1 = await queryInterface.rawSelect(
      { tableName: 'Spots', schema: options.schema },
      { where: { name: 'Forest Retreat' } },
      ['id']
    );

    const spot2 = await queryInterface.rawSelect(
      { tableName: 'Spots', schema: options.schema },
      { where: { name: 'Ocean Breeze' } },
      ['id']
    );

    if (!demoUser || !spot1 || !spot2) {
      console.error('Missing required references. Aborting Reviews seed.');
      return;
    }

    return await queryInterface.bulkInsert(options, [
      {
        spotId: spot1,
        userId: demoUser,
        review: 'This was an awesome spot!',
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: spot2,
        userId: demoUser,
        review: 'Could use some work.',
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['This was an awesome spot!', 'Could use some work.'] }
    });
  }
};
