'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // Define the options object for production
    const options = {};

    if (process.env.NODE_ENV === 'production') {
      options.schema = 'public'; // Set schema if in production
    }

    await queryInterface.createTable('SpotImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        allowNull: false,
        references: {
          model: 'Spots',
          key: 'id'
        },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      preview: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
        type: Sequelize.DATE
      }
    }, options);
  },

  async down(queryInterface, Sequelize) {
    const options = {};
    if (process.env.NODE_ENV === 'production') {
      options.schema = 'public';
    }

    await queryInterface.dropTable('SpotImages', options);
  }
};
