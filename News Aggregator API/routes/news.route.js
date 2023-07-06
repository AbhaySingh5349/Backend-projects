const express = require("express");
const newsController = require("../controllers/news.controller");
const { authMiddleware, cacheMiddleware } = require("../middlewares");

const router = express.Router();

router.get("/", authMiddleware.verifyToken, newsController.fetchNews);
router.get(
  "/search/:keyword",
  cacheMiddleware.redisCache,
  authMiddleware.verifyToken,
  newsController.fetchNewsWithKeyword
);

router.get(
  "/:id/:read",
  authMiddleware.verifyToken,
  newsController.markArticleAsRead
);

module.exports = router;
