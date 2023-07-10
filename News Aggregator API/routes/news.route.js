const express = require("express");
const newsController = require("../controllers/news.controller");
const { authMiddleware, cacheMiddleware } = require("../middlewares");

const router = express.Router();

router.get("/", authMiddleware.verifyToken, newsController.fetchNews);
router.get(
  "/search/:keyword",
  authMiddleware.verifyToken,
  cacheMiddleware.redisCache,
  newsController.fetchNewsWithKeyword
);

router.get("/read", authMiddleware.verifyToken, newsController.getReadArticles);

module.exports = router;
