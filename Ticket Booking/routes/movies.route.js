const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies.controller");
const cacheMiddleware = require("../middlewares/cache.middleware");

router
  .route("/")
  .get(moviesController.getAllMovies)
  .post(moviesController.addMovie);

router.route("/:id/city/:city").get(moviesController.getMoviesInCity);

router.route("/details").post(moviesController.addMovieDeatils);

router
  .route("/details/:movieId")
  .get(cacheMiddleware.redisCache, moviesController.getMovieInfo);

router
  .route("/reviews/:movieId")
  .post(moviesController.addMovieReview)
  .get(moviesController.getMovieReviews);

module.exports = router;
