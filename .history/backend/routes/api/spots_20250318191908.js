// backend/routes/api/spots.js
// Pseudocode for Spots router

/*
1. Import required modules:
   - express
   */
   const express = require('express');
   /*

   - Sequelize models (Spot, SpotImage, User, Review, Booking)
   */
   (Spot, SpotImage, User, Review); (requireAuth)
   const { Spot, SpotImage, User, Review } = require('../../db/models');

   /*
   - Authentication middleware (requireAuth)
   */
   const { requireAuth } = require('../../utils/auth');
   /*
   - Validation utilities (check, handleValidationErrors)
   */
   const { check, validationResult } = require('express-validator');
   /*
   - Sequelize operators (Op)
   */
   const { Op } = require('sequelize');
   /*

2. Create router object
*/
const router = express.Router();
   /*

3. Define validation middleware:
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


  function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }

  module.exports = {
    validateSpot,
    validateQueryFilters
  };

   /*

4. Implement GET /api/spots:
   - Apply validateQueryFilters middleware
   */
   router.get('/', validateQueryFilters,
   /*
   - Parse query parameters with defaults (page=1, size=20)
   */
   async (req, res) => {
    const { page = 1, size = 20 } = req.query;
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;
   /*
   - Build filtering conditions based on query parameters
   */
   const spots = await Spot.findAll({
    limit,
    offset,
   /*
   - Calculate pagination (limit, offset)
   */

   /*
   - Query database for spots with filters, pagination, and calculations
   */

   /*
   - Format response with proper data types
   */

   /*
   - Return JSON response with spots, page, and size
   */
   res.json({ spots, page: parseInt(page), size: parseInt(size) });
});
   /*

5. Implement GET /api/spots/current:
   - Apply requireAuth middleware
   */
   router.get('/current', requireAuth,
   /*
   - Get current user ID from request
   */
   async (req, res) => {
    const userId = req.user.id;
   /*
   - Query database for spots owned by current user
   */
   const spots = await Spot.findAll({ where: { ownerId: userId } });
   /*
   - Format response with proper data types
   */

   /*
   - Return JSON response with spots
   */
   res.json({ spots });
});
   /*

6. Implement GET /api/spots/:id:
   - Extract spot ID from request parameters
   */
   router.get('/:id', async (req, res) => {
    const spotId = req.params.id;
   /*
   - Query database for spot with details
   */
   const spot = await Spot.findByPk(spotId, {
    include: [SpotImage, User, Review]
   /*
   - Check if spot exists, return 404 if not
   */
   if (!spot) {
    return res.status(404).json({ message: 'Spot not found' });
  }
   /*
   - Format response with proper data types
   */

   /*
   - Return JSON response with spot details
   */
   res.json({ spot });
});
   /*

7. Implement POST /api/spots:
   - Apply requireAuth and validateSpot middleware
   */
   router.post('/', requireAuth,
   /*
   - Extract spot data from request body
   */
   validateSpot, async (req, res) => {
    const { name, description, price } = req.body;
   /*
   - Create new spot with current user as owner
   */
   const ownerId = req.user.id;
   /*
   - Format response with proper data types
   */
   const spot = await Spot.create({ 
   /*
   - Return 201 status with JSON response
   */

   /*

8. Implement POST /api/spots/:id/images:
   - Apply requireAuth middleware
   */

   /*
   - Extract spot ID and image data
   */

   /*
   - Check if spot exists, return 404 if not
   */

   /*
   - Check if current user is owner, return 403 if not
   */

   /*
   - Create new spot image
   */

   /*
   - Return 201 status with JSON response
   */

   /*

9. Implement PUT /api/spots/:id:
   - Apply requireAuth and validateSpot middleware
   */

   /*
   - Extract spot ID and updated data
   */

   /*
   - Check if spot exists, return 404 if not
   */

   /*
   - Check if current user is owner, return 403 if not
   */

   /*
   - Update spot with new data
   */

   /*
   - Format response with proper data types
   */

   /*
   - Return JSON response with updated spot
   */

   /*

10. Implement DELETE /api/spots/:id:
    - Apply requireAuth middleware
    */

   /*
    - Extract spot ID
    */

   /*
    - Check if spot exists, return 404 if not
    */

   /*
    - Check if current user is owner, return 403 if not
    */

   /*
    - Delete spot
    */

   /*
    - Return success message
    */

   /*

11. Export router
*/

   /*
*/


// backend/routes/api/spots.js
// Pseudocode for Spots router

/*
1. Import required modules:
a. express: const express = require('express');
b. Sequelize models: (Spot, SpotImage, User, Review):
 (requireAuth)
 const { Spot, SpotImage, User, Review } = require('../../db/models');
c.  Authentication middleware: const { requireAuth } = require('../../utils/auth');
d.    Validation utilities (check, handleValidationErrors): const { check, validationResult } = require('express-validator');
 e. Sequelize operators (Op): const { Op } = require('sequelize');

2. Create router object:
const router = express.Router();

3. Define validation middleware:
 a. validateSpot: Validates all spot fields

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

3.b.
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


function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = {
  validateSpot,
  validateQueryFilters
};

*/
