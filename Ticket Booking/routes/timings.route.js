const express = require("express");
const router = express.Router();
const timingsController = require("../controllers/timings.controller");

router.route("/").get(timingsController.getAllTimings);

router.post("/", timingsController.addTimings);

module.exports = router;
