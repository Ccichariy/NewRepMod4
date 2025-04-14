const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Review, User, Spot, ReviewImage, SpotImage } = require('../../db/models');

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
        ]},
        // include: [
      {
        model: SpotImage,
            as: 'SpotImages', //
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

    // Extract preview image from SpotImages
    const previewImg = json.Spot?.SpotImages?.find(img => img.preview);
    json.Spot.previewImage = previewImg ? previewImg.url : 'No preview image';
    delete json.Spot.SpotImages;

    return json;
  });

  res.status(200).json({ Reviews: formatted });
});

module.exports = router;
