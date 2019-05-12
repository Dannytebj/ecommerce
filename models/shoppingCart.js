'use strict';

module.exports = (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    item_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cart_id: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    attributes: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    buy_now: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 1
    },
    added_on: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },{
    freezeTableName: true,
    tableName: 'shopping_cart',
    timestamps: false,
    underscored: true
  });
  ShoppingCart.associate = function(models) {
    ShoppingCart.belongsTo(models.Product, {
      foreignKey: 'product_id'
    })
  }
  return ShoppingCart;
}