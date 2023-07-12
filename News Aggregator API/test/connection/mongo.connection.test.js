const mongoose = require("mongoose");
const config = require("../../config/config");

const MONGOOSE_URL = config.test_db_url;

before((done) => {
  mongoose
    .connect(MONGOOSE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("test db is connected");
      done();
    })
    .catch((err) => {
      console.log("error connecting test db: ", err);
      done();
    });
});

beforeEach((done) => {
  console.log("dropping collection before each unit test");
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});

afterEach((done) => {
  console.log("dropping collection after each unit test");
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});

after((done) => {
  console.log("disconnecting test db");
  mongoose.disconnect();
  done();
});
