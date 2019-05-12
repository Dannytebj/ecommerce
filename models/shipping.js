'use strict';

module.exports = (sequelize, DataTypes) => {
  const Shipping = sequelize.define('Shipping', {
    shipping_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    shipping_type: {
      type: DataTypes.STRING(100),
      allowNull: false 
    },
    shipping_cost: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false 
    },
    shipping_region_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false 
    }
  }, {
    freezeTableName: true,
    tableName: 'shipping',
    timestamps: false,
  });
  Shipping.associate = function(models) {
    // associations can be defined here
    Shipping.belongsTo(models.ShippingRegion, {
      foreignKey: 'shipping_region_id'
    })
  };
  return Shipping;
};
