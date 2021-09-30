const { Model, DataTypes } = require("sequelize");
const db = require("../helpers/connection_db");

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "products",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Product;
