'use strict';

module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    department_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    tableName: 'department',
    timestamps: false,
  });
  Department.associate = function(models) {
    // associations can be defined here
    Department.hasMany(models.Category, { 
      foreignKey: 'department_id'
    })
  };
  return Department;
};
