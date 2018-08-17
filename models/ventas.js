'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ventas = sequelize.define('Ventas', {
    id_products: DataTypes.INTEGER,
    size: DataTypes.STRING,
    final_price: DataTypes.DECIMAL
  }, {});
  Ventas.associate = function(models) {
    // associations can be defined here
  };
  return Ventas;
};