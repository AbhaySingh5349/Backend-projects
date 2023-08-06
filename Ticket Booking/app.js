const express = require("express"); // for creating web server
const app = express(); // initialize application
const routes = require("./routes");

app.use(express.json()); // parse json request body
app.use(express.urlencoded({ extended: true })); // parse urlencoded request body

// localhost:3000/
app.get("/", (req, res) => {
  res.status(200).send("wellcome to book my show api");
});

app.use("/", routes);

module.exports = app;
