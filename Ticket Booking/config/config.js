const dotenv = require("dotenv"); // loads environment variables from .env file
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

module.exports = {
  port: process.env.PORT,
  sql_db_name: process.env.SQL_DB_NAME,
  sql_db_username: process.env.SQL_DB_USERNAME,
  sql_db_password: process.env.SQL_DB_PASSWORD,
};
