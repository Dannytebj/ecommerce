'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    discounted_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      defaultValue: 0.00
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    image_2: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    thumbnail: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    display: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  },{
    freezeTableName: true,
    tableName: 'product',
    timestamps: false,
    underscored: true
  });
  Product.associate = function(models) {
  }
  return Product;
}
