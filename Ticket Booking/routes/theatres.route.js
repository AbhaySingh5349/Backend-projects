const express = require("express");
const router = express.Router();
const theatresController = require("../controllers/theatres.controller");

router
  .route("/")
  .get(theatresController.getAllTheatres)
  .post(theatresController.addTheatre);

router.route("/:theatreId").get(theatresController.getTheatreById);

router.route("/shows/:theatreId").get(theatresController.getNextSevenDaysShows);

router.route("/city/:city").get(theatresController.getTheatresInCity);

module.exports = router;
