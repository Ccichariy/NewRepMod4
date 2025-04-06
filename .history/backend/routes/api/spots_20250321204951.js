// backend/routes/api/spots.js
// Pseudocode for Spots router

/*
1. Import required modules:
   - express
   - Sequelize models (Spot, SpotImage, User, Review)
   - Authentication middleware (requireAuth)
   - Validation utilities (check, handleValidationErrors)
   - Sequelize operators (Op)
*/

const express = require('express');
const { Spot, SpotImage, User, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');

const router = express.Router();

/*
2. Define validation middleware:
   - validateSpot: Validates all spot fields
*/

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

/*
   - validateQueryFilters: Validates query parameters for pagination and filtering
*/

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

/*
3. Utility function to handle validation errors
*/
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

/*
4. Implement GET /api/spots
*/

router.get('/', validateQueryFilters, async (req, res) => {
  const { page = 1, size = 20 } = req.query;
  const limit = parseInt(size);
  const offset = (parseInt(page) - 1) * limit;

  /*
   - Query database for spots with filters, pagination
  */
  const spots = await Spot.findAll({
    limit,
    offset,
    include: [{ model: SpotImage, attributes: ['url'] }]
  });

  res.json({ spots, page: parseInt(page), size: parseInt(size) });
});

/*
5. Implement GET /api/spots/current
*/

router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;

  const spots = await Spot.findAll({
    where: { ownerId: userId },
    include: [{ model: SpotImage, attributes: ['url'] }]
  });

  res.json({ spots });
});

/*
6. Implement GET /api/spots/:id
*/

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

/*
7. Implement POST /api/spots
*/

router.post('/', requireAuth, validateSpot, async (req, res) => {
  const { name, description, price } = req.body;
  const ownerId = req.user.id;

  const spot = await Spot.create({ name, description, price, ownerId });

  res.status(201).json({ spot });
});

/*
8. Implement POST /api/spots/:id/images
*/

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

/*
9. Implement PUT /api/spots/:id
*/

router.put('/:id', requireAuth, validateSpot, async (req, res) => {
  const spotId = req.params.id;
/*
  - address, city, state, country, lat, lng, name, description, price from body
  */
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
/*
  Try:
   - Find spot by ID
*/
  const spot = await Spot.findByPk(spotId);
  /*
  - If spot doesn't exist, return 404 with error message
*/
  if (!spot) {
    return res.status(404).json({ message: 'Spot not found' });
  }
  /*
  - If current user is not the owner, return 403 with "Forbidden" message
*/
  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await spot.update({ name, description, price });

  res.json({ spot });
});

/*
10. Implement DELETE /api/spots/:id
*/

router.delete('/:id', requireAuth, async (req, res) => {
  const spotId = req.params.id;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({ message: 'Spot not found' });
  }

  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await spot.destroy();

  res.json({ message: 'Spot deleted successfully' });
});

/*
11. Export router
*/

module.exports = router;
