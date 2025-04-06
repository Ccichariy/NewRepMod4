'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    //1. Set up options object for production environment
    const options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;

    //2. Define up method:
    //- Find demo user
  const demoUser = await queryInterface.rawSelect('Users', {
    where: {
      username: 'demo'
    },
  }, ['id']);
  //- Create sample spots:
  //- Spot 1: App Academy in San Francisco
  await queryInterface.bulkInsert('Spots', [
    {
      name: 'App Academy',
      location: 'San Francisco',
      userId: demoUser,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  //- Spot 2: Sunny Retreat in Los Angeles
  {
    name: 'Sunny Retreat',
    location: 'Los Angeles',
    userId: demoUser,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  //- Spot 3: Mountain View in Denver
  {
    name: 'Mountain View',
    location: 'Denver',
    userId: demoUser,
    createdAt: new Date(),
    updatedAt: new Date()
  }
], options);

//- Create sample spot images:
    // - Preview image for Spot 1
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1, // Assuming IDs are sequentially assigned
        url: 'http://example.com/preview1.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    // - Non-preview image for Spot 1
    {
      spotId: 1,
      url: 'http://example.com/non-preview1.jpg',
      preview: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    // - Preview image for Spot 2
    {
      spotId: 2,
      url: 'http://example.com/preview2.jpg',
      preview: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    // - Preview image for Spot 3
    {
      spotId: 3,
      url: 'http://example.com/preview3.jpg',
      preview: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], options);
},
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
