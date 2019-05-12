'use strict';

module.exports = (sequelize, DataTypes) => {
  const Tax = sequelize.define('Tax', {
    tax_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tax_type: {
      type: DataTypes.STRING(100),
      allowNull: false 
    },
    tax_percentage: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false 
    }
  }, {
    freezeTableName: true,
    tableName: 'tax',
    timestamps: false,
  });
  Tax.associate = function(models) {
    // associations can be defined here
  };
  return Tax;
};
