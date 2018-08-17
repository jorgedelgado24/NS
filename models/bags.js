'use strict';
module.exports = (sequelize, DataTypes) => {
  var Bags = sequelize.define('Bags', {
    cloth_id: DataTypes.STRING,
    size: DataTypes.STRING,
  }, {});
  Bags.associate = function(models) {
    // associations can be defined here
  };
  return Bags;
};