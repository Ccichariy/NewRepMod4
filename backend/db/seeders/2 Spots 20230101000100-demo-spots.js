'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Spots';

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('Starting Spots Seeder');
    // grab the demo user’s ID
    const demoUser = await queryInterface.rawSelect(
      { tableName: 'Users', schema: options.schema },
      { where: { username: 'Demo-lition' } },
      ['id']
    );
    if (!demoUser) {
      console.error('Demo user not found, aborting Spot seed.');
      return;
    }

    return queryInterface.bulkInsert(options, [
      // ─── Existing two spots ───
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
      },
      {
        ownerId: demoUser,
        address: '789 Desert Rd',
        city: 'Phoenix',
        state: 'AZ',
        country: 'USA',
        lat: 33.4484,
        lng: -112.0740,
        name: 'Desert Oasis',
        description: 'A serene desert retreat with pool and mountain views.',
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUser,
        address: '321 Lakeshore Dr',
        city: 'South Lake Tahoe',
        state: 'CA',
        country: 'USA',
        lat: 38.9399,
        lng: -119.9772,
        name: 'Tahoe Cabin',
        description: 'Cozy cabin right on the lake. Paddleboard included!',
        price: 275,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUser,
        address: '147 Mountain View Blvd',
        city: 'Denver',
        state: 'CO',
        country: 'USA',
        lat: 39.7392,
        lng: -104.9903,
        name: 'Rocky Mountain Loft',
        description: 'Modern loft overlooking the Rocky Mountains.',
        price: 220,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: demoUser,
        address: '258 Coastal Hwy',
        city: 'Carmel-by-the-Sea',
        state: 'CA',
        country: 'USA',
        lat: 36.5552,
        lng: -121.9233,
        name: 'Oceanview Cottage',
        description: 'Charming cottage with sweeping ocean vistas.',
        price: 350,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: [
          'Forest Retreat',
          'Ocean Breeze',
          'Desert Oasis',
          'Tahoe Cabin',
          'Rocky Mountain Loft',
          'Oceanview Cottage'
        ]
      }
    }, {});
  }
};


// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }
// options.tableName = 'Spots';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     console.log('Starting Spots Seeder');
//     let demoUser;

//     try {
//       demoUser = await queryInterface.rawSelect(
//         {
//           tableName: 'Users',
//           schema: options.schema
//         },
//         {
//           where: {
//             username: 'Demo-lition'
//           }
//         },
//         ['id']
//       );
//     } catch (err) {
//       console.error('Error finding demo user:', err);
//       return;
//     }

//     if (!demoUser) {
//       console.error('Demo user not found, aborting Spot seed.');
//       return;
//     }

//     return await queryInterface.bulkInsert(options, [
//       {
//         ownerId: demoUser,
//         address: '123 Forest Ave',
//         city: 'San Francisco',
//         state: 'CA',
//         country: 'USA',
//         lat: 37.7749,
//         lng: -122.4194,
//         name: 'Forest Retreat',
//         description: 'A serene cabin in the woods.',
//         price: 150,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         ownerId: demoUser,
//         address: '456 Ocean Dr',
//         city: 'Santa Monica',
//         state: 'CA',
//         country: 'USA',
//         lat: 34.0195,
//         lng: -118.4912,
//         name: 'Ocean Breeze',
//         description: 'Beachside bungalow with amazing views.',
//         price: 300,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         ownerId: demoUser,
//         address: '1111 My Place Rd',
//         city: 'Atlanta',
//         state: 'GA',
//         country: 'USA',
//         lat: 33.4484,
//         lng: -112.0740,
//         name: 'Place Estate',
//         description: 'A serene desert retreat with pool and mountain views.',
//         price: 200,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         ownerId: demoUser,
//         address: '1212 MLK Jr. Dr',
//         city: 'Lake Tahoe',
//         state: 'CA',
//         country: 'USA',
//         lat: 39.0968,
//         lng: -120.0324,
//         name: 'Tahoe Cabin',
//         description: 'Cozy cabin right on the lake. Paddleboard included!',
//         price: 275,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         ownerId: demoUser,
//         address: '147 Mountain View Blvd',
//         city: 'Denver',
//         state: 'CO',
//         country: 'USA',
//         lat: 39.7392,
//         lng: -104.9903,
//         name: 'Rocky Mountain Loft',
//         description: 'Modern loft overlooking the Rockies.',
//         price: 220,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       },
//       {
//         ownerId: demoUser,
//         address: '258 Coastal Hwy',
//         city: 'Carmel',
//         state: 'CA',
//         country: 'USA',
//         lat: 36.5552,
//         lng: -121.9233,
//         name: 'Oceanview Cottage',
//         description: 'Charming cottage with sweeping ocean vistas.',
//         price: 350,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }
//     ], );

//   async down(queryInterface, Sequelize) {
//   const Op = Sequelize.Op;
//   return await queryInterface.bulkDelete(options, {
//     name: {
//       [Op.in]: [
//         'Forest Retreat',
//         'Ocean Breeze',
//         'Desert Oasis',
//         'Tahoe Cabin',
//         'Rocky Mountain Loft',
//         'Oceanview Cottage'
//       ]
//     }
//   }, {});
// }
