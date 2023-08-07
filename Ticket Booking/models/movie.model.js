const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");
const { Theatre } = require("./theatre.model");
const { Timings } = require("./timings.model");
const { Screen } = require("./screen.model");

const Movie = sequelize.define(
  "Movie",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overview: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstScreeningDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lastScreeningDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Movie",
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  }
);

// Many-to-many association between Movie and Theatre (A movie can be shown in multiple theatres, and a theatre can show multiple movies)
Movie.belongsToMany(Theatre, {
  foreignKey: "movieId",
  through: { model: Timings, unique: false },
});

Theatre.belongsToMany(Movie, {
  foreignKey: "theatreId",
  through: { model: Timings, unique: false },
});

// Theatre.hasMany(Screen);
// Screen.belongsTo(Theatre);

// Movie.hasMany(Timings);
// Timings.belongsTo(Movie);

sequelize
  .sync()
  .then(() => {
    console.log("Movies db synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing Movies db:", err);
  });

module.exports = { Movie };
