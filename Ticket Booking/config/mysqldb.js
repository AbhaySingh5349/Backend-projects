const Sequelize = require("sequelize");
const config = require("./config");

const DATABASE = config.sql_db_name;
const USERNAME = config.sql_db_username;
const PASSWORD = config.sql_db_password;
const HOST = "localhost";

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  dialect: "mysql",
  host: HOST,
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    idle: 10000, // Time (in milliseconds) that a connection can be idle before being removed from the pool
  },
});

const connectToSqlDb = async function () {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to mysql database");
  } catch (error) {
    console.log("Error connecting to database: " + error);
  }
};

module.exports = {
  sequelize,
  connectToSqlDb,
};
