const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");

const Timings = sequelize.define(
  "Timings",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticketsAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Timings",
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
    console.log("Timings db synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing Timings db:", err);
  });

module.exports = { Timings };
