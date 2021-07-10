const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const users = require("./routes/users");
const authenticate = require("./routes/authenticate");

mongoose
  .connect("mongodb://localhost:27017/blitz", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Connected to DB...");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/users", users);
app.use("/api/authenticate", authenticate);

app.get("/", (req, res) => {
  res.send("Ok");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Listening on port : " + port);
});
