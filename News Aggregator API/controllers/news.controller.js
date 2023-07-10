const { newsService, preferencesService } = require("../services");
let preferencesData = require("../preferences.json");
const config = require("../config/config");
const URLSearchParams = require("url-search-params");
const cacheMiddleware = require("../middlewares/cache.middleware");
const utils = require("../utils/utils");

let payload = {
  pageSize: 20,
  apiKey: config.news_api_key,
  language: "en",
};

const fetchNews = async (req, res) => {
  if (!req.user) {
    return res.status(401).send(req.message);
  }

  let preferences_arr = preferencesData.preferences_list;
  const user_id = req.user._id;

  const idx = preferencesService.checkIdExists(preferences_arr, user_id);
  const categories_list = idx === -1 ? [] : preferences_arr[idx].categories;

  try {
    if (categories_list.length === 0) {
      payload.sources = [
        "the-hindu",
        "the-times-of-india",
        "the-washington-post",
        "bloomberg",
        "espn",
        "financial-post",
        "national-geographic",
      ];

      const searchParams = new URLSearchParams(payload);
      let data = await newsService.newsArticles(
        `${config.news_url}?${searchParams}`
      );

      return res.status(200).json(data);
    } else {
      let promises_arr = [];

      categories_list.forEach((category) => {
        payload.category = category;
        let searchParams = new URLSearchParams(payload);

        let promise = newsService.newsArticles(
          `${config.news_url}?${searchParams}`
        );

        promises_arr.push(promise);
      });

      Promise.all(promises_arr)
        .then((values) => {
          return res.status(200).json(values);
        })
        .catch((err) => {
          return res.status(500).json({ error: err });
        });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const fetchNewsWithKeyword = async (req, res) => {
  if (!req.user) {
    return res.status(401).send(req.message);
  }

  const searchKey = req.params?.keyword;
  if (!searchKey) {
    return res.status(400).send("Invalid parameter");
  }

  payload.q = searchKey;
  const searchParams = new URLSearchParams(payload);
  let data = await newsService.newsArticles(
    `${config.news_url}?${searchParams}`
  );

  const cacheKey = req.user._id + ":" + utils.generateURL(req);
  await cacheMiddleware.redisClient.set(
    cacheKey,
    JSON.stringify(data),
    "EX",
    config.cache_expiration_time
  );
  return res.status(200).json(data);
};

const getReadArticles = async (req, res) => {
  if (!req.user) {
    return res.status(401).send(req.message);
  }

  const keys = await cacheMiddleware.redisClient.keys("*");
  console.log("keys: ", keys);

  // let articles = [];

  // keys.forEach(async (key) => {
  //   let cachedNewsArticles = await cacheMiddleware.redisClient.get(key);
  //   let cur_articles = JSON.parse(cachedNewsArticles).articles;
  //   console.log("cur_articles: ", cur_articles);
  //   cur_articles.forEach((article) => articles.push(article));
  // });

  // console.log("end");
  // return res.status(200).json(articles);

  // keys.forEach((key) => {
  //   cacheMiddleware.redisClient
  //     .get(key)
  //     .then((value) => {
  //       console.log("cachedNewsArticles: ", value);
  //       let cur_articles = JSON.parse(cachedNewsArticles).articles;
  //       console.log("cur_articles: ", cur_articles);
  //       cur_articles.forEach((article) => articles.push(article));
  //     })
  //     .catch((err) => {
  //       return res.status(500).json({ error: err });
  //     });
  // });

  // console.log("end");
  // console.log("articles: ", articles);
  // return res.status(200).json(articles);

  let promises_arr = [];
  keys.forEach((key) => {
    let cachedNewsArticles = cacheMiddleware.redisClient.get(key);
    promises_arr.push(cachedNewsArticles); // stores pending promises
  });

  let articles = [];
  Promise.all(promises_arr)
    .then((values) => {
      values.forEach((obj) => {
        console.log("hello");
        let cur_articles = JSON.parse(obj).articles;
        cur_articles.forEach((article) => articles.push(article));
      });

      return res.status(200).json(articles);
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};

module.exports = {
  fetchNews,
  fetchNewsWithKeyword,
  getReadArticles,
};
