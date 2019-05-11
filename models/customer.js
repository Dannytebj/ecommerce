'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    credit_card: {
      type: DataTypes.TEXT
    },
    address_1: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    address_2: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    city: {
      type:  DataTypes.STRING,
      defaultValue: null
    },
    region: {
      type:  DataTypes.STRING,
      defaultValue: null
    },
    postal_code: {
      type:  DataTypes.STRING,
      defaultValue: null
    },
    country: {
      type:  DataTypes.STRING,
      defaultValue: null
    },
    shipping_region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    day_phone: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    eve_phone: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    mob_phone: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  }, {
    freezeTableName: true,
    tableName: 'customer',
    timestamps: false,
    hooks: {
      beforeCreate: async function(customer) {
        customer.password = await bcrypt.hash(customer.password, 10);
      }
    },

  });
  Customer.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  }
  Customer.associate = function(models) {
    // associations can be defined here
  };
  return Customer;
};
