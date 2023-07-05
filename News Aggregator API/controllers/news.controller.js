const { newsService, preferencesService } = require("../services");
let preferencesData = require("../preferences.json");
const config = require("../config/config");
const URLSearchParams = require("url-search-params");

let url = "https://newsapi.org/v2/top-headlines";

const fetchNews = async (req, res) => {
  if (!req.user) {
    return res.status(401).send(req.message);
  }

  let preferences_arr = preferencesData.preferences_list;
  const user_id = req.user._id;

  const idx = preferencesService.checkIdExists(preferences_arr, user_id);
  const categories_list = idx === -1 ? [] : preferences_arr[idx].categories;
  let payload = {
    pageSize: 20,
    apiKey: config.news_api_key,
    language: "en",
  };

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
      let data = await newsService.newsArticles(`${url}?${searchParams}`);

      return res.status(200).json(data);
    } else {
      let promises_arr = [];

      categories_list.forEach((category) => {
        payload.category = category;
        let searchParams = new URLSearchParams(payload);

        let promise = newsService.newsArticles(`${url}?${searchParams}`);

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

module.exports = {
  fetchNews,
};