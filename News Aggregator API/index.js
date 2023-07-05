const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

const PORT = config.port;
const MONGOOSE_URL = config.db_url;

try {
  mongoose.connect(MONGOOSE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("db is connected");

  // opening a socket connection on machine stating that anything coming from outside on PORT 3000 will hit this application
  app.listen(PORT, (err) => {
    if (!err) {
      console.log(`Server successfully started on port: ${PORT}`);
    } else {
      console.log("Failed to start server");
    }
  });
} catch (err) {
  console.log("error connecting db: ", err);
}
