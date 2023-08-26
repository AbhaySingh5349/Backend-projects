const express = require("express");
const router = express.Router();
const elasticsearchController = require("../controllers/elastic-search.controller");

router
  .route("/movies")
  .get(elasticsearchController.searchMovies)
  .post(elasticsearchController.createBulkMovieDetailsIndex);

module.exports = router;
