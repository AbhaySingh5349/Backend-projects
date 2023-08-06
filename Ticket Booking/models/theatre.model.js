const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");
const { Screen } = require("./screen.model");

const Theatre = sequelize.define("theatre", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Theatre db synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing Theatre db:", err);
  });

Theatre.hasMany(Screen, {
  foreignKey: "theatreId",
  as: "screens",
});

Screen.belongsTo(Theatre, {
  foreignKey: "theatreId",
});

module.exports = { Theatre };
