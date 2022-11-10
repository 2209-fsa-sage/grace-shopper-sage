const Sequelize = require("sequelize");
const db = require("../db");

const CartItem = db.define("cartItem", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = CartItem;
