'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'SpotImages';

module.exports = {
  async up (queryInterface, Sequelize) {
    const getSpotId = async (name) => await queryInterface.rawSelect(
      { tableName: 'Spots', schema: options.schema },
      { where: { name } },
      ['id']
    );

    const spotNames = [
      'Forest Retreat',
      'Ocean Breeze',
      'Desert Oasis',
      'Tahoe Cabin',
      'Rocky Mountain Loft',
      'Oceanview Cottage'
    ];

    const urlMap = {
      'Forest Retreat': 
        'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Ocean Breeze':
        'https://images.pexels.com/photos/17532029/pexels-photo-17532029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'Desert Oasis':
        'https://images.pexels.com/photos/7746557/pexels-photo-7746557.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Tahoe Cabin':
        'https://images.pexels.com/photos/259574/pexels-photo-259574.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Rocky Mountain Loft':
        'https://images.pexels.com/photos/6010269/pexels-photo-6010269.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Oceanview Cottage':
        'https://images.pexels.com/photos/32343497/pexels-photo-32343497.jpeg?auto=compress&cs=tinysrgb&w=1200'
    };

    const otherUrlMap = {
      'Forest Retreat': [
        'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1200',         
        'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      'Ocean Breeze': [
        'https://images.pexels.com/photos/17532029/pexels-photo-17532029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/9989518/pexels-photo-9989518.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/17532029/pexels-photo-17532029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/17532029/pexels-photo-17532029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      'Desert Oasis': [
        'https://images.pexels.com/photos/7746557/pexels-photo-7746557.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/7746557/pexels-photo-7746557.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/7746557/pexels-photo-7746557.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/7746557/pexels-photo-7746557.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      'Tahoe Cabin': [
        'https://images.pexels.com/photos/259574/pexels-photo-259574.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/259574/pexels-photo-259574.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/259574/pexels-photo-259574.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/259574/pexels-photo-259574.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      'Rocky Mountain Loft': [
        'https://images.pexels.com/photos/6010269/pexels-photo-6010269.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/6010269/pexels-photo-6010269.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/6010269/pexels-photo-6010269.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/6010269/pexels-photo-6010269.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      'Oceanview Cottage': [
        'https://images.pexels.com/photos/32343497/pexels-photo-32343497.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/32343497/pexels-photo-32343497.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/32343497/pexels-photo-32343497.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/32343497/pexels-photo-32343497.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ]
    };

    const records = [];
    for (let name of spotNames) {
      const spotId = await getSpotId(name);
      if (spotId) {
        records.push({
          spotId,
          url: urlMap[name],
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        for (let url of otherUrlMap[name]) {
          records.push({
            spotId,
            url,
            preview: false,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }
    }

    if (records.length) {
      return queryInterface.bulkInsert(options, records, {});
    } else {
      console.error('No spot IDs found – aborting SpotImages seed');
    }
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    const urls = Object.values({
      'Forest Retreat':
        'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Ocean Breeze':
        'https://images.pexels.com/photos/17532029/pexels-photo-17532029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'Desert Oasis':
        'https://images.pexels.com/photos/7746557/pexels-photo-7746557.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Tahoe Cabin':
        'https://images.pexels.com/photos/259574/pexels-photo-259574.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Rocky Mountain Loft':
        'https://images.pexels.com/photos/6010269/pexels-photo-6010269.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'Oceanview Cottage':
        'https://images.pexels.com/photos/32343497/pexels-photo-32343497.jpeg?auto=compress&cs=tinysrgb&w=1200'
    });

    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: urls }
    }, {});
  }
};



// 'use strict';

// let options = {};
// if (process.env.NODE_ENV === 'production') {
//   options.schema = process.env.SCHEMA;
// }
// options.tableName = 'SpotImages';

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     // ID for Forest Retreat
//     const forestId = await queryInterface.rawSelect(
//       { tableName: 'Spots', schema: options.schema },
//       { where: { name: 'Forest Retreat' } },
//       ['id']
//     );
//     // ID for Ocean Breeze
//     const oceanId = await queryInterface.rawSelect(
//       { tableName: 'Spots', schema: options.schema },
//       { where: { name: 'Ocean Breeze' } },
//       ['id']
//     );

//     const records = [];

//     if (forestId) {
//       records.push({
//         spotId: forestId,
//         url: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1200',
//         preview: true,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       });
//     }
//     if (oceanId) {
//       records.push({
//         spotId: oceanId,
//         url: 'https://images.pexels.com/photos/17532029/pexels-photo-17532029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//         preview: true,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       });
//     }

//     if (records.length) {
//       return queryInterface.bulkInsert(options, records);
//     } else {
//       console.error('No spot IDs found, aborting SpotImages seeding.');
//     }
//   },

//   async down(queryInterface, Sequelize) {
//     return queryInterface.bulkDelete(options, {
//       url: {
//         [Sequelize.Op.in]: [
//           'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1200',
//           'https://images.pexels.com/photos/17532029/pexels-photo-17532029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//         ]
//       }
//     }, {});
//   }
// };




// // 'use strict';

// // let options = {};
// // if (process.env.NODE_ENV === 'production') {
// //   options.schema = process.env.SCHEMA;
// // }
// // options.tableName = 'SpotImages';

// // module.exports = {
// //   async up(queryInterface, Sequelize) {
// //     const spotId = await queryInterface.rawSelect(
// //       { tableName: 'Spots', schema: options.schema },
// //       { where: { name: 'Forest Retreat' } },
// //       ['id']
// //     );

// //     if (!spotId) {
// //       console.error('Forest Retreat spot not found. Aborting SpotImages seeding.');
// //       return;
// //     }

// //     return await queryInterface.bulkInsert(options, [
// //       {
// //         spotId,
// //         url: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1200',
// //         preview: true,
// //         createdAt: new Date(),
// //         updatedAt: new Date()
// //       },
// //       {
// //         spotId,
// //         url: 'https://images.pexels.com/photos/2468773/pexels-photo-2468773.jpeg?auto=compress&cs=tinysrgb&w=1200',
// //         preview: true,
// //         createdAt: new Date(),
// //         updatedAt: new Date()
// //       }
// //     ]);
// //   },

// //   async down(queryInterface, Sequelize) {
// //     return await queryInterface.bulkDelete(options, null, {});
// //   }
// // };
