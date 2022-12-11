const express = require("express");

const router = express.Router();

const { postBus, postStation } = require("../controllers/search");

router.post("/bus", postBus);

router.post("/station", postStation);

module.exports = router;
