'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  }, {
    freezeTableName: true,
    tableName: 'category',
    timestamps: false,
  });
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsTo(models.Department, {
        foreignKey: 'department_id'
    })
  };
  return Category;
};
