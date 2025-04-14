const express = require('express');
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check, validationResult } = require('express-validator');
const { Sequelize, Op } = require('sequelize');

const router = express.Router();

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

const validateSpot = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name must not be more than 50 characters long'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  handleValidationErrors
];

const validateQueryFilters = [
  check('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  check('size')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Size must be a positive integer'),
  check('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
  check('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),
  handleValidationErrors
];

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
];

router.get('/', validateQueryFilters, async (req, res) => {
  const { page = 1, size = 20 } = req.query;
  const limit = parseInt(size);
  const offset = (parseInt(page) - 1) * limit;

  const spots = await Spot.findAll({
    limit,
    offset,
    include: [{ model: SpotImage, attributes: ['url'] }]
  });

  res.json({ spots, page: parseInt(page), size: parseInt(size) });
});

router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;

  try {
    const spots = await Spot.findAll({
      where: { ownerId: userId },
      include: [
        {
          model: SpotImage,
          as: 'SpotImages',
          attributes: ['url']
        }
      ]
    });

    res.json({ spots });
  } catch (error) {
    console.error('Error fetching spots:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const spotId = req.params.id;

  const spot = await Spot.findByPk(spotId, {
    include: [
      { model: SpotImage, attributes: ['url'] },
      { model: User, attributes: ['id', 'username'] },
      { model: Review }
    ]
  });

  if (!spot) {
    return res.status(404).json({ message: 'Spot not found' });
  }

  res.json({ spot });
});

router.post('/', requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const ownerId = req.user.id;

  const spot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId });

  res.status(201).json({ spot });
});

router.post('/:id/images', requireAuth, async (req, res) => {
  const spotId = req.params.id;
  const { url } = req.body;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: 'Spot not found' });
    }

    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const image = await SpotImage.create({ spotId, url });

    res.status(201).json({ image });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', requireAuth, validateSpot, async (req, res) => {
  const spotId = req.params.id;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: 'Spot not found' });
  }

  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await spot.update({ address, city, state, country, lat, lng, name, description, price });

  res.json({ spot });
});

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
  const { spotId } = req.params;
  const { review, stars } = req.body;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  const existingReview = await Review.findOne({
    where: {
      userId: req.user.id,
      spotId: spot.id
    }
  });

  if (existingReview) {
    return res.status(500).json({ message: "User already has a review for this spot" });
  }

  const newReview = await Review.create({
    userId: req.user.id,
    spotId,
    review,
    stars
  });

  return res.status(201).json(newReview);
});

router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  const reviews = await Review.findAll({
    where: { spotId },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });

  return res.status(200).json({ Reviews: reviews });
});

module.exports = router;



























// // backend/routes/api/spots.js
// // Pseudocode for Spots router

// /*
// 1. Import required modules:
//    - express
//    - Sequelize models (Spot, SpotImage, User, Review)
//    - Authentication middleware (requireAuth)
//    - Validation utilities (check, handleValidationErrors)
//    - Sequelize operators (Op)
// */

// const express = require('express');
// const { Spot, SpotImage, User, Review } = require('../../db/models');
// const { requireAuth } = require('../../utils/auth');
// const { check, validationResult } = require('express-validator');
// const { Op } = require('sequelize');

// const router = express.Router();

// /*
// 2. Define validation middleware:
//    - validateSpot: Validates all spot fields
// */

// const validateSpot = [
//   check('name')
//     .exists({ checkFalsy: true })
//     .withMessage('Name is required')
//     .isLength({ max: 50 })
//     .withMessage('Name must not be more than 50 characters long'),
//   check('description')
//     .exists({ checkFalsy: true })
//     .withMessage('Description is required'),
//   check('price')
//     .exists({ checkFalsy: true })
//     .withMessage('Price is required')
//     .isFloat({ min: 0 })
//     .withMessage('Price must be a positive number'),
//   handleValidationErrors
// ];

// /*
//    - validateQueryFilters: Validates query parameters for pagination and filtering
// */

// const validateQueryFilters = [
//   check('page')
//     .optional()
//     .isInt({ min: 1 })
//     .withMessage('Page must be a positive integer'),
//   check('size')
//     .optional()
//     .isInt({ min: 1 })
//     .withMessage('Size must be a positive integer'),
//   check('minPrice')
//     .optional()
//     .isFloat({ min: 0 })
//     .withMessage('Minimum price must be a positive number'),
//   check('maxPrice')
//     .optional()
//     .isFloat({ min: 0 })
//     .withMessage('Maximum price must be a positive number'),
//   handleValidationErrors
// ];

// /*
// 3. Utility function to handle validation errors
// */
// function handleValidationErrors(req, res, next) {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// }

// /*
// 4. Implement GET /api/spots
// */

// router.get('/', validateQueryFilters, async (req, res) => {
//   const { page = 1, size = 20 } = req.query;
//   const limit = parseInt(size);
//   const offset = (parseInt(page) - 1) * limit;

//   /*
//    - Query database for spots with filters, pagination
//   */
//   const spots = await Spot.findAll({
//     limit,
//     offset,
//     include: [{ model: SpotImage, attributes: ['url'] }]
//   });

//   res.json({ spots, page: parseInt(page), size: parseInt(size) });
// });

// /*
// 5. // GET /api/spots/current
// */
// router.get('/current', requireAuth, async (req, res) => {
//   console.log('✅ HIT /api/spots/current route');

//   const userId = req.user.id;

//   try {
//     const spots = await Spot.findAll({
//       where: { ownerId: userId },
//       include: [
//         {
//           model: SpotImage,
//           as: 'SpotImages', // Correct alias
//           attributes: ['url']  // Adjust based on what information you need
//         }
//       ]
//     });

//     res.json({ spots });
//   } catch (error) {
//     console.error('Error fetching spots:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// /*
// 6. Implement GET /api/spots/:id
// */

// router.get('/:id', async (req, res) => {
//   const spotId = req.params.id;

//   const spot = await Spot.findByPk(spotId, {
//     include: [
//       { model: SpotImage, attributes: ['url'] },
//       { model: User, attributes: ['id', 'username'] },
//       { model: Review }
//     ]
//   });

//   if (!spot) {
//     return res.status(404).json({ message: 'Spot not found' });
//   }

//   res.json({ spot });
// });

// /*
// 7. Implement POST /api/spots
// */

// router.post('/', requireAuth, validateSpot, async (req, res) => {

//   console.log(req);

//   const { address, city, state, country, lat, lng, name, description, price } = req.body;
//   const ownerId = req.user.id;

//   const spot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId });

//   res.status(201).json({ spot });
// });

// /*
// 8. Implement POST /api/spots/:id/images
// */

// router.post('/:id/images', requireAuth, async (req, res) => {
//   const spotId = req.params.id;
//   const { url } = req.body;

//   try {
//   const spot = await Spot.findByPk(spotId);

//   if (!spot) {
//     return res.status(404).json({ message: 'Spot not found' });
//   }

//   if (spot.ownerId !== req.user.id) {
//     return res.status(403).json({ message: 'Forbidden' });
//   }

//   const image = await SpotImage.create({ spotId, url });

//   res.status(201).json({ image });


// } catch (error) {
//   return res.status(500).json({ message: 'Internal server error' });
// }
// });

// /*
// 9. Implement PUT /api/spots/:id
// */

// router.put('/:id', requireAuth, validateSpot, async (req, res) => {
//   const spotId = req.params.id;
















































//   try {
//     const { address, city, state, country, lat, lng, name, description, price } = req.body;

//     const spot = await Spot.findByPk(spotId);

//     if (!spot) {
//       return res.status(404).json({ message: 'Spot not found' });
//     }

//     if (spot.ownerId !== req.user.id) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }

//     await spot.update({ address, city, state, country, lat, lng, name, description, price });

//     return res.json({
//       id: spot.id,
//       ownerId: spot.ownerId,
//       address: spot.address,
//       city: spot.city,
//       state: spot.state,
//       country: spot.country,
//       lat: spot.lat,
//       lng: spot.lng,
//       name: spot.name,
//       description: spot.description,
//       price: spot.price,
//       createdAt: spot.createdAt,
//       updatedAt: spot.updatedAt
//     });
//   } catch (error) {    // Handle validation errors
//     if (error.name === 'SequelizeValidationError') {
//       return res.status(400).json({ errors: error.errors.map(e => e.message) });
//     }
//   /*
//      - Otherwise, return 500 with error message
// */

// return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// /*
// Export the router
// */
// module.exports = router;
// /*
// 10. Implement DELETE /api/spots/:id
// */

// router.delete('/:id', requireAuth, async (req, res) => {
//   const spotId = req.params.id;

//   const spot = await Spot.findByPk(spotId);

//   if (!spot) {
//     return res.status(404).json({ message: 'Spot not found' });
//   }

//   if (spot.ownerId !== req.user.id) {
//     return res.status(403).json({ message: 'Forbidden' });
//   }

//   await spot.destroy();

//   res.json({ message: 'Spot deleted successfully' });
// });

// /*
// 11. Export router
// */

// module.exports = router;
