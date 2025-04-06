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

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
