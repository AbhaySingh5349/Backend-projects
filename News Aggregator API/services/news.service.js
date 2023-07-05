const axios = require("axios");

// axios -> used to make thrid party calls (returns a promise)
// two mechanisms of making async calls -> callback and promises

function newsArticles(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
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
