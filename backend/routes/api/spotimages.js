// backend/routes/api/spotimages.js
const express = require('express');
const { SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {
  const imageId = req.params.imageId;
  const image = await SpotImage.findByPk(imageId);

  if (!image) {
    return res.status(404).json({
      message: "Spot Image couldn't be found"
    });
  }

  await image.destroy();
  return res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;
