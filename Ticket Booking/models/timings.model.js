const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");

const Timings = sequelize.define("timings", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  ticketsAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Timings db synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing Timings db:", err);
  });

module.exports = { Timings };
