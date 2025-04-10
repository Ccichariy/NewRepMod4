'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;
    }

    console.log('Starting Spots Seeder');

    // Get demo user ID
    let demoUser;
    try {
      demoUser = await queryInterface.rawSelect('User', {
        where: { username: 'Demo-lition' }
      }, ['id']);
      console.log('Found demo user ID:', demoUser);
    } catch (err) {
      console.error('Error finding demo user:', err);
      return;
    }

    if (!demoUser) {
      console.error('No demo user found. Aborting spot seed.');
      return;
    }

    // Insert Spots
    options.tableName = 'Spots';
    try {
      await queryInterface.bulkInsert(options, [
        {
          name: 'App Academy',
          address: '825 Battery St',
          city: 'San Francisco',
          state: 'California',
          country: 'USA',
          lat: 37.7989,
          lng: -122.4015,
          description: 'A coding bootcamp in San Francisco.',
          price: 100.00,
          ownerId: demoUser,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Sunny Retreat',
          address: '123 Sunshine Blvd',
          city: 'Los Angeles',
          state: 'California',
          country: 'USA',
          lat: 34.0522,
          lng: -118.2437,
          description: 'A sunny retreat in Los Angeles.',
          price: 150.00,
          ownerId: demoUser,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Mountain View',
          address: '456 Mountain Rd',
          city: 'Denver',
          state: 'Colorado',
          country: 'USA',
          lat: 39.7392,
          lng: -104.9903,
          description: 'A beautiful mountain view in Denver.',
          price: 200.00,
          ownerId: demoUser,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
      console.log('Spots inserted');
    } catch (err) {
      console.error('Error inserting spots:', err);
      return;
    }

    // Insert Spot Images
    options.tableName = 'SpotImages';
    try {
      await queryInterface.bulkInsert(options, [
        {
          spotId: 1,
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
      ]);
      console.log('Spot images inserted');
    } catch (err) {
      console.error('Error inserting spot images:', err);
    }
  },

  async down(queryInterface, Sequelize) {
    const options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;
    }

    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, null, {});
  }
};
