const express = require("express");

const router = express.Router();

const { postGeolocation } = require("../controllers/geolocation");

router.post("/", postGeolocation);

module.exports = router;
