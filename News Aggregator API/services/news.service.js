const axios = require("axios");
const bcrypt = require("bcrypt");
const URLSearchParams = require("url-search-params");

// axios -> used to make thrid party calls (returns a promise)
// two mechanisms of making async calls -> callback and promises

function newsArticles(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        const articles = response.data.articles;
        response.data.articles = articles.map((article) => {
          const hashedURL = bcrypt.hashSync(article.url, 1);
          return {
            article_id: hashedURL,
            ...article,
          };
        });
        return resolve(response.data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

module.exports = {
  newsArticles,
};
