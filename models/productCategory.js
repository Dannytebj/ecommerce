'use strict';

module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },

  },{
    freezeTableName: true,
    tableName: 'product_category',
    timestamps: false,
    underscored: true
  });
  ProductCategory.associate = function(models) {
    ProductCategory.hasMany(models.Product, {
      foreignKey: 'product_id',
    })
  }
  return ProductCategory;
}