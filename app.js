const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();
cors();

const db = require("./loaders/db")();
const geolocationRoute = require("./routes/geolocationRouter");
const searchRoute = require("./routes/searchRouter");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/geolocation", geolocationRoute);
app.use("/search", searchRoute);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
