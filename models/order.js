'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    total_amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      defaultValue: 0.00 
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    shipped_on: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0
    },
    comments: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    customer_id: {
      type: DataTypes.INTEGER(11),
      defaultValue: null
    },
    auth_code: {
      type:  DataTypes.STRING(50),
      defaultValue: null
    },
    reference: {
      type:  DataTypes.STRING(50),
      defaultValue: null
    },
    shipping_id: {
      type:  DataTypes.INTEGER(11),
      defaultValue: null
    },
    tax_id: {
      type:  DataTypes.INTEGER(11),
      defaultValue: null
    },
    cart_id: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    tableName: 'orders',
    timestamps: false,
  });

  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};
