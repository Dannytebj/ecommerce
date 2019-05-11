'use strict';

module.exports = (sequelize, DataTypes) => {
  const ProductAttribute = sequelize.define('ProductAttribute', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    attribute_value_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },

  },{
    freezeTableName: true,
    tableName: 'product_attribute',
    timestamps: false,
    underscored: true
  });
  ProductAttribute.associate = function(models) {
    ProductAttribute.hasMany(models.AttributeValue, {
      foreignKey: 'attribute_value_id',
    })
  }
  return ProductAttribute;
}