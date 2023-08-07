const express = require("express");
const router = express.Router();
const screensController = require("../controllers/screens.controller");

router.route("/").get(screensController.getAllScreens);

router.route("/:screenId").get(screensController.getScreenById);

router.post("/", screensController.addScreenToTheatre);

module.exports = router;
