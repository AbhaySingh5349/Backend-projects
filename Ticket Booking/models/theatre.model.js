const { sequelize } = require("../config/mysqldb");
const DataTypes = require("sequelize");
const { Screen } = require("./screen.model");

const Theatre = sequelize.define(
  "Theatre",
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
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Theatre",
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  }
);

// One-to-many association between Theatre and Screen (A theatre can have multiple screens)
Theatre.hasMany(Screen, {
  foreignKey: "theatreId",
  as: "screens",
});

Screen.belongsTo(Theatre, {
  foreignKey: "theatreId",
});

sequelize
  .sync()
  .then(() => {
    console.log("Theatre db synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing Theatre db:", err);
  });

module.exports = { Theatre };
