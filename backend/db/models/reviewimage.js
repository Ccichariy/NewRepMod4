'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    static associate(models) {
      // ReviewImage belongs to Review
      ReviewImage.belongsTo(models.Review, { foreignKey: 'reviewId', as: 'Review' });
    }
  }

  ReviewImage.init({
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'URL cannot be empty'
        },
        isUrl: {
          msg: 'Must be a valid URL'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });

  return ReviewImage;
};
