const express = require("express");
const newsController = require("../controllers/news.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authMiddleware.verifyToken, newsController.fetchNews);
router.get(
  "/search/:keyword",
  authMiddleware.verifyToken,
  newsController.fetchNewsWithKeyword
);

module.exports = router;
