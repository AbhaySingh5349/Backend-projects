const dotenv = require("dotenv"); // loads environment variables from .env file
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

module.exports = {
  port: process.env.PORT,
  db_url: process.env.MONGODB_URL,
  test_db_url: process.env.MONGODB_TEST_URL,
  news_api_key: process.env.NEWS_API_KEY,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
  },
  news_url: process.env.NEWS_BASE_URL,
  cache_expiration_time: process.env.CACHE_EXPIRATION_SECONDS,
};
