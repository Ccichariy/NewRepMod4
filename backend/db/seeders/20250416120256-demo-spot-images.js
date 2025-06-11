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
        'https://images.pexels.com/photos/1559821/pexels-photo-1559821.jpeg?auto=compress&cs=tinysrgb&w=1200',         
        'https://images.pexels.com/photos/2805285/pexels-photo-2805285.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/3011848/pexels-photo-3011848.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1093325/pexels-photo-1093325.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      'Ocean Breeze': [
        'https://images.pexels.com/photos/417351/pexels-photo-417351.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/9989518/pexels-photo-9989518.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1097408/pexels-photo-1097408.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/18421099/pexels-photo-18421099/free-photo-of-people-swimming-in-clear-turquoise-water.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      'Desert Oasis': [
        'https://images.pexels.com/photos/2983198/pexels-photo-2983198.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/19492456/pexels-photo-19492456/free-photo-of-hammock-on-patio.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/21856162/pexels-photo-21856162/free-photo-of-bungalow-at-bateen-liwa-resort-in-abu-dhabi-uae.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/30709727/pexels-photo-30709727/free-photo-of-serene-desert-view-through-stone-arches.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      'Tahoe Cabin': [
        'https://images.pexels.com/photos/30708773/pexels-photo-30708773/free-photo-of-cozy-wooden-bedroom-in-santa-teresa-brazil.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/7163597/pexels-photo-7163597.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://media.istockphoto.com/id/471100285/photo/dining-room-chalet-furnished-bed-breakfast.jpg?b=1&s=612x612&w=0&k=20&c=j0F3WTBTvq6BP0ZXsJv0akeM4u4WHvkVtqiz0Hz8-nE=',
        'https://images.pexels.com/photos/8092397/pexels-photo-8092397.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      'Rocky Mountain Loft': [
        'https://images.pexels.com/photos/19737828/pexels-photo-19737828/free-photo-of-cozy-seats-in-rustic-apartment.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/6538932/pexels-photo-6538932.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/20337840/pexels-photo-20337840/free-photo-of-view-of-a-loft-style-living-room-with-a-brown-leather-sofa.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/5686481/pexels-photo-5686481.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      'Oceanview Cottage': [
        'https://images.pexels.com/photos/4906407/pexels-photo-4906407.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/3951742/pexels-photo-3951742.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/4906249/pexels-photo-4906249.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/7746106/pexels-photo-7746106.jpeg?auto=compress&cs=tinysrgb&w=1200'
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
