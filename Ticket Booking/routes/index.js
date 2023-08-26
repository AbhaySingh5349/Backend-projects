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

const esRoute = require("./elastic-search.route");
router.use("/index", esRoute);

module.exports = router;

/*
{
  "name": "Crazy Stupid Love",
  "overview": "fun and drama",
  "firstScreeningDate": "2023-06-25",
  "lastScreeningDate": "2023-08-28"
}
{
  "name": "YJHD",
  "overview": "trekking trip",
  "firstScreeningDate": "2023-09-05",
  "lastScreeningDate": "2023-010-10"
}
{
  "name": "ZNMD",
  "overview": "vacation in Spain",
  "firstScreeningDate": "2023-08-23",
  "lastScreeningDate": "2023-09-25"
}
{
  "name": "Wolf of walt street",
  "overview": "fraud and malfeasance",
  "firstScreeningDate": "2023-08-11",
  "lastScreeningDate": "2023-09-8"
} 
*/
