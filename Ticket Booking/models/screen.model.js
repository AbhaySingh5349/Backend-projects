const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");
const { Timings } = require("./timings.model");

const Screen = sequelize.define("screen", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Screen.hasMany(Timings, {
  foreignKey: "screenId",
  as: "timings",
});

Timings.belongsTo(Screen, {
  foreignKey: "screenId",
});

sequelize
  .sync()
  .then(() => {
    console.log("Screen db synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing Screen db:", err);
  });

module.exports = { Screen };
