const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");

const Reviews = sequelize.define(
  "Reviews",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
  },
  {
    sequelize,
    modelName: "Reviews",
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Reviews db synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing Reviews db:", err);
  });

module.exports = { Reviews };
