'use strict';

module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define('Attribute', {
    attribute_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false 
    }
  },{
    freezeTableName: true,
    tableName: 'attribute',
    timestamps: false,
    underscored: true
  });
  Attribute.associate = function(models) {
    // Attribute.hasMany(models.AttributeValue, {
    //   foreignKey: 'attribute_id',
    // })
    Attribute.belongsToMany(models.Product, {
      through: 'ProductAttribute',
      foreignKey: 'attribute_value_id'
    });
  }
  return Attribute;
}