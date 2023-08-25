const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");

const MovieDetails = sequelize.define(
  "MovieDetails",
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cast: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    plot: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "MovieDetails",
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
    console.log("Movie Details db synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing Movie Details db:", err);
  });

module.exports = { MovieDetails };
