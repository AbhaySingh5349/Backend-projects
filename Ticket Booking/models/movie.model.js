const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");
const { Timings } = require("./timings.model");

const Movie = sequelize.define("movie", {
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
});

Movie.hasMany(Timings);
Timings.belongsTo(Movie);

sequelize
  .sync()
  .then(() => {
    console.log("Movies db synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing Movies db:", err);
  });

module.exports = { Movie };
