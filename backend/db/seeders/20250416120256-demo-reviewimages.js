'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'SpotImages';

module.exports = {
  async up(queryInterface, Sequelize) {
    const spotId = await queryInterface.rawSelect(
      { tableName: 'Spots', schema: options.schema },
      { where: { name: 'Forest Retreat' } },
      ['id']
    );

    if (!spotId) {
      console.error('Forest Retreat spot not found. Aborting SpotImages seeding.');
      return;
    }

    return await queryInterface.bulkInsert(options, [
      {
        spotId,
        url: 'https://example.com/forest.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId,
        url: 'https://example.com/forest-back.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete(options, null, {});
  }
};
