const express = require("express");

const router = express.Router();

const { putGeolocation } = require("../controllers/geolocation");

router.put("/", putGeolocation);

module.exports = router;
