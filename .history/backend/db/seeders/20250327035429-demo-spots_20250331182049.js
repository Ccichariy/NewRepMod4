'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Set up options object for production environment
    const options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;
    }

    // 2. Define up method:
    // - Find demo user
    const demoUser = await queryInterface.rawSelect('Users', {
      where: {
        username: 'demo'
      },
    }, ['id']);

    // - Create sample spots
    await queryInterface.bulkInsert('Spots', [
      {
        name: 'App Academy',
        location: 'San Francisco',
        userId: demoUser,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sunny Retreat',
        city: 'Los Angeles',
        userId: demoUser,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mountain View',
        location: 'Denver',
        userId: demoUser,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], options);

    // - Create sample spot images
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1, // Assuming IDs are sequentially assigned
        url: 'http://example.com/preview1.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'http://example.com/non-preview1.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'http://example.com/preview2.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'http://example.com/preview3.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], options);
  },

  // 3. Define down method:
  async down(queryInterface, Sequelize) {
    const options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;
    }

    await queryInterface.bulkDelete('SpotImages', null, options);
    await queryInterface.bulkDelete('Spots', null, options);
  }
};
