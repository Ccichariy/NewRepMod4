const express = require('express');
const { ReviewImage, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// DELETE /api/review-images/:imageId
router.delete('/:imageId', requireAuth, async (req, res) => {
  const { imageId } = req.params;
  const userId = req.user.id;

  const reviewImage = await ReviewImage.findByPk(imageId, {
    include: {
      model: Review,
      as: 'Review'
    }
  });

  // Check if the image exists
  if (!reviewImage) {
    return res.status(404).json({
      message: "Review Image couldn't be found"
    });
  }

//   // Check if the current user owns the review
//   if (reviewImage.Review.userId !== userId) {
//     return res.status(403).json({
//       message: "Forbidden"
//     });
//   }

  // Delete the image
  await reviewImage.destroy();

  return res.status(200).json({ message: 'Successfully deleted' });
});

module.exports = router;
