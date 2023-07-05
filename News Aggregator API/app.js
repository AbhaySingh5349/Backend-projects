const express = require("express"); // for creating web server
const app = express(); // initialize application
const routes = require("./routes");

app.use(express.json()); // parse json request body
app.use(express.urlencoded({ extended: true })); // parse urlencoded request body

// localhost:3000/
app.get("/", (req, res) => {
  res.status(200).send("wellcome to news aggregator api");
});

app.use("/", routes);

module.exports = app;

// expired token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGE0MDYwNjljMmJlMDhmNWRlZWMzZWQiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjg4NDgzMjIzLCJleHAiOjE2ODg0ODUwMjN9.LICd18PXg4Px6D3vAcxhZIXGRY5418bYwvWRB8veslI
