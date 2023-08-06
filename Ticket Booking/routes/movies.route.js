const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies.controller");

router.route("/").get(moviesController.getAllMovies);

router.post("/", moviesController.addMovie);

module.exports = router;
