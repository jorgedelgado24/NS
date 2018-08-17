'use strict';
module.exports = (sequelize, DataTypes) => {
  var Products = sequelize.define('Products', {
    item_name: DataTypes.STRING,
    brand: DataTypes.STRING,
    type: DataTypes.STRING,
    cost: DataTypes.DECIMAL,
    regular_price: DataTypes.DECIMAL,
    discount: DataTypes.INTEGER,
    final_price: DataTypes.DECIMAL,
    pre_order: DataTypes.INTEGER,
    shipment_name: DataTypes.STRING
  }, {});
  Products.associate = function(models) {
    // associations can be defined here
    Products.hasMany(models.Sizes, {
      onDelete: "cascade"
    });
  };
  return Products;
};