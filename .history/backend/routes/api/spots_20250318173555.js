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

   /*
   - Authentication middleware (requireAuth)
   */

   /*
   - Validation utilities (check, handleValidationErrors)
   */

   /*
   - Sequelize operators (Op)
   */

   /*

2. Create router object
*/

   /*

3. Define validation middleware:
   - validateSpot: Validates all spot fields
   */

   /*
   - validateQueryFilters: Validates query parameters for pagination and filtering
   */

   /*

4. Implement GET /api/spots:
   - Apply validateQueryFilters middleware
   */

   /*
   - Parse query parameters with defaults (page=1, size=20)
   */

   /*
   - Build filtering conditions based on query parameters
   */

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

   /*

5. Implement GET /api/spots/current:
   - Apply requireAuth middleware
   */

   /*
   - Get current user ID from request
   */

   /*
   - Query database for spots owned by current user
   */

   /*
   - Format response with proper data types
   */

   /*
   - Return JSON response with spots
   */

   /*

6. Implement GET /api/spots/:id:
   - Extract spot ID from request parameters
   */

   /*
   - Query database for spot with details
   */

   /*
   - Check if spot exists, return 404 if not
   */

   /*
   - Format response with proper data types
   
   - Return JSON response with spot details

7. Implement POST /api/spots:
   - Apply requireAuth and validateSpot middleware
   - Extract spot data from request body
   - Create new spot with current user as owner
   - Format response with proper data types
   - Return 201 status with JSON response

8. Implement POST /api/spots/:id/images:
   - Apply requireAuth middleware
   - Extract spot ID and image data
   - Check if spot exists, return 404 if not
   - Check if current user is owner, return 403 if not
   - Create new spot image
   - Return 201 status with JSON response

9. Implement PUT /api/spots/:id:
   - Apply requireAuth and validateSpot middleware
   - Extract spot ID and updated data
   - Check if spot exists, return 404 if not
   - Check if current user is owner, return 403 if not
   - Update spot with new data
   - Format response with proper data types
   - Return JSON response with updated spot

10. Implement DELETE /api/spots/:id:
    - Apply requireAuth middleware
    - Extract spot ID
    - Check if spot exists, return 404 if not
    - Check if current user is owner, return 403 if not
    - Delete spot
    - Return success message

11. Export router
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

 Define validation middleware:
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

3.
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
