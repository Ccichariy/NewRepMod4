// const express = require('express');
// const router = express.Router();
// const { requireAuth } = require('../../utils/auth');
// const { Review, User, Spot, ReviewImage, SpotImage } = require('../../db/models');

// router.get('/current', requireAuth, async (req, res) => {
//   const userId = req.user.id;

//   const reviews = await Review.findAll({
//     where: { userId },
//     include: [
//         {
//           model: User,
//           attributes: ['id', 'firstName', 'lastName']
//         },
//         {
//           model: Spot,
//           attributes: [
//             'id', 'ownerId', 'address', 'city', 'state', 'country',
//             'lat', 'lng', 'name', 'price'
//           ],
//           include: [
//             {
//               model: SpotImage,
//               as: 'SpotImages',
//               attributes: ['url', 'preview']
//             }
//           ]
//         },

//         {
//           model: ReviewImage,
//           attributes: ['id', 'url']
//         }
//       ]

//   });

//   const formatted = reviews.map(review => {
//     const json = review.toJSON();

//     // Extract preview image from SpotImages
//     const previewImg = json.Spot?.SpotImages?.find(img => img.preview);
//     json.Spot.previewImage = previewImg ? previewImg.url : 'No preview image';
//     delete json.Spot.SpotImages;

//     return json;
//   });

//   return res.status(200).json({ Reviews: formatted });
// });

// module.exports = router;



const express = require('express');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Review, User, Spot, ReviewImage, SpotImage } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();


// ✅ Review validation middleware
const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .withMessage('Stars are required')
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];


// ✅ GET /api/reviews/current
router.get('/current', requireAuth, async (req, res) => {
  const userId = req.user.id;

  const reviews = await Review.findAll({
    where: { userId },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        attributes: [
          'id', 'ownerId', 'address', 'city', 'state', 'country',
          'lat', 'lng', 'name', 'price'
        ],
        include: [
          {
            model: SpotImage,
            as: 'SpotImages',
            attributes: ['url', 'preview']
          }
        ]
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });

  const formatted = reviews.map(review => {
    const json = review.toJSON();
    const previewImg = json.Spot?.SpotImages?.find(img => img.preview);
    json.Spot.previewImage = previewImg ? previewImg.url : null;
    delete json.Spot.SpotImages;
    return json;
  });

  return res.status(200).json({ Reviews: formatted });
});


// ✅ POST /api/reviews/:reviewId/images
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { url } = req.body;
  const userId = req.user.id;

  const review = await Review.findByPk(reviewId, {
    include: [ReviewImage]
  });

  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  if (review.userId !== userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (review.ReviewImages.length >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached"
    });
  }

  const newImage = await ReviewImage.create({
    reviewId,
    url
  });

  return res.status(201).json({
    id: newImage.id,
    url: newImage.url
  });
});

// ✅ PUT /api/reviews/:reviewId - Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
  const { reviewId } = req.params;
  const { review, stars } = req.body;
  const userId = req.user.id;

  const reviewToUpdate = await Review.findByPk(reviewId);

  if (!reviewToUpdate) {
    return res.status(404).json({
      message: "Review couldn't be found"
    });
  }

  if (reviewToUpdate.userId !== userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  reviewToUpdate.review = review;
  reviewToUpdate.stars = stars;
  await reviewToUpdate.save();

  return res.status(200).json(reviewToUpdate);
});


module.exports = router;
