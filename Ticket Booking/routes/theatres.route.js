const express = require("express");
const router = express.Router();
const theatresController = require("../controllers/theatres.controller");

router.route("/").get(theatresController.getAllTheatres);

router.route("/:theatreId").get(theatresController.getTheatreById);

router.route("/shows/:theatreId").get(theatresController.getNextSevenDaysShows);

router.post("/", theatresController.addTheatre);

module.exports = router;
