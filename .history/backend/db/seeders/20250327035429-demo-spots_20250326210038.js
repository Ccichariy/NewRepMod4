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
//
  const demoUser = await queryInterface.rawSelect('Users', {
    where: {
      username: 'demo'
    },
  }, ['id']);
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
