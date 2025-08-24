const { Sequelize, DataTypes } = require('sequelize');
const sequelize =  require("../config/db")


console.log("hello Model");

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING, // Changed to STRING for name
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.JSON,
    allowNull: true
 }}, {
  tableName: 'products'
});

module.exports = Product;