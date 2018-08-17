'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sizes = sequelize.define('Sizes', {
    size: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {});
  Sizes.associate = function(models) {
    // associations can be defined here
    Sizes.belongsTo(models.Products, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Sizes;
};