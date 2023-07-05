const fs = require("fs");

const checkIdExists = (arr, user_id) => {
  return arr.findIndex((obj) => obj.preferenceId == user_id);
};

const writeFileAsync = (filePath, data) => {
  let file_updated = true;
  fs.writeFile(
    filePath,
    data,
    { encoding: "utf8", flag: "w" },
    function (err, data) {
      if (err) {
        file_updated = false;
      }
    }
  );

  return file_updated;
};

module.exports = {
  checkIdExists,
  writeFileAsync,
};
