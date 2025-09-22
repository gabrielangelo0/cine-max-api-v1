const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import the Sequelize configuration

const Iphones = sequelize.define("Iphones", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  originalPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  storage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Iphones;
