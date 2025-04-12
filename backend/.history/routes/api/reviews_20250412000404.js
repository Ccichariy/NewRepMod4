// routes/api/reviews.js
const express = require('express');
const router = express.Router();
const { Review, User, Spot, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

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
        attributes: {
          exclude: ['description', 'createdAt', 'updatedAt']
        }
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });

  // Attach previewImage to the Spot
  const formatted = reviews.map(review => {
    const reviewJson = review.toJSON();

    // Optional: add previewImage manually if needed
    if (reviewJson.Spot && reviewJson.Spot.SpotImages) {
      const preview = reviewJson.Spot.SpotImages.find(img => img.preview === true);
      reviewJson.Spot.previewImage = preview ? preview.url : 'No preview image';
    }

    return reviewJson;
  });

  res.json({ Reviews: formatted });
});

module.exports = router;
