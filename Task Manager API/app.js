const express = require("express"); // for creating web server
const bodyParser = require("body-parser"); // helps to fetch body as json
const cors = require("cors");
const app = express(); // initialize application

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// localhost:3000/
app.get("/", (req, res) => {
  res.status(200).send("wellcome to task manager api");
});

// tasks route
const taskInfo = require("./routes/taskInfo.js");
app.use("/tasks", taskInfo);

const PORT = 3000;

// opening a socket connection on machine stating that anything coming from outside on PORT 3000 will hit this application
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server successfully started on port: ${PORT}`);
  } else {
    console.log("Failed to start server");
  }
});
