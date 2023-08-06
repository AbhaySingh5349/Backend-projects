const express = require("express");
const router = express.Router();
const theatresController = require("../controllers/theatres.controller");

router.route("/").get(theatresController.getAllTheatres);

router.route("/:theatreId").get(theatresController.getTheatreById);

router.post("/", theatresController.addTheatres);

module.exports = router;
