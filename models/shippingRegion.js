'use strict';

module.exports = (sequelize, DataTypes) => {
  const ShippingRegion = sequelize.define('ShippingRegion', {
    shipping_region_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    shipping_region: {
      type: DataTypes.STRING(100),
      allowNull: false 
    }
  }, {
    freezeTableName: true,
    tableName: 'shipping_region',
    timestamps: false,
  });
  ShippingRegion.associate = function(models) {
    // associations can be defined here
  };
  return ShippingRegion;
};
