const fs = require("fs"); // to handle file operations

const checkIdExists = (arr, req_id) => {
  return arr.findIndex((obj) => obj.id == req_id);
};

function writeFileSync(filePath, data) {
  try {
    fs.writeFileSync(filePath, data, { encoding: "utf8", flag: "w" });
  } catch (err) {
    console.log("failed to write file: ", err);
  }
}

module.exports = {
  checkIdExists,
  writeFileSync,
};
