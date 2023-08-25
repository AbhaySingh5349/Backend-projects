const Redis = require("ioredis");

// Create a Redis client
const redisClient = new Redis({
  host: "localhost", // Redis server host
  port: 6379, // Redis server port
});

const redisCache = async (req, res, next) => {
  const cacheKey = `movie:${req.params.movieId}`;

  const cachedMovieDeatils = await redisClient.get(cacheKey);
  if (cachedMovieDeatils) {
    return res.status(200).send(JSON.parse(cachedMovieDeatils));
  }

  next(); // If data is not cached, proceed to the next middleware or route handler
};

module.exports = {
  redisCache,
  redisClient,
};
