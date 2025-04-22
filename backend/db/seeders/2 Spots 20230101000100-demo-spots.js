'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Spots';

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('Starting Spots Seeder');
    let demoUser;

    try {
      demoUser = await queryInterface.rawSelect(
        {
          tableName: 'Users',
          schema: options.schema
        },
        {
          where: {
            username: 'Demo-lition'
          }
        },
        ['id']
      );
    } catch (err) {
      console.error('Error finding demo user:', err);
      return;
    }

    if (!demoUser) {
      console.error('Demo user not found, aborting Spot seed.');
      return;
    }

    return await queryInterface.bulkInsert(options, [
      {
        ownerId: demoUser,
        address: '123 Forest Ave',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Forest Retreat',
        description: 'A serene cabin in the woods.',
        price: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUser,
        address: '456 Ocean Dr',
        city: 'Santa Monica',
        state: 'CA',
        country: 'USA',
        lat: 34.0195,
        lng: -118.4912,
        name: 'Ocean Breeze',
        description: 'Beachside bungalow with amazing views.',
        price: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Forest Retreat', 'Ocean Breeze'] }
    }, {});
  }
};
