const express = require("express");
const router = express.Router();

const authRoute = require("./auth.route");
router.use("/auth", authRoute);

const newsRoute = require("./news.route");
router.use("/news", newsRoute);

const preferencesRoute = require("./preferences.route");
router.use("/preferences", preferencesRoute);

module.exports = router;
