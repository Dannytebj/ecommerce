'use strict';

module.exports = (sequelize, DataTypes) => {
  const AttributeValue = sequelize.define('AttributeValue', {
    attribute_value_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    attribute_id: {
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false 
    }
  },{
    freezeTableName: true,
    tableName: 'attribute_value',
    timestamps: false,
    underscored: true
  });
  AttributeValue.associate = function(models) {
    AttributeValue.belongsTo(models.Attribute, {
      foreignKey: 'attribute_id'
    })
    AttributeValue.belongsToMany(models.Product, {
      through: 'ProductAttribute',
      foreignKey: 'attribute_value_id'
    })

  }
  return AttributeValue;
}