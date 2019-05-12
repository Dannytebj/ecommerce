'use strict';

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },{
    freezeTableName: true,
    tableName: 'review',
    timestamps: false,
    underscored: true
  });
  Review.associate = function(models) {
    Review.belongsTo(models.Customer, {
      foreignKey: 'customer_id'
    });
  }
  return Review;
}

// CREATE TABLE `shopping_cart` (
//   `item_id` int(11) NOT NULL AUTO_INCREMENT,
//   `cart_id` char(32) NOT NULL,
//   `product_id` int(11) NOT NULL,
//   `attributes` varchar(1000) NOT NULL,
//   `quantity` int(11) NOT NULL,
//   `buy_now` tinyint(1) NOT NULL DEFAULT '1',
//   `added_on` datetime NOT NULL,
//   PRIMARY KEY (`item_id`),
//   KEY `idx_shopping_cart_cart_id` (`cart_id`)
// ) ENGINE=MyISAM DEFAULT CHARSET=latin1;