const express = require("express");
const router = express.Router();

const moviesRoute = require("./movies.route");
router.use("/movies", moviesRoute);

const theatresRoute = require("./theatres.route");
router.use("/theatres", theatresRoute);

const screensRoute = require("./screens.route");
router.use("/screens", screensRoute);

const timingsRoute = require("./timings.route");
router.use("/timings", timingsRoute);

module.exports = router;
