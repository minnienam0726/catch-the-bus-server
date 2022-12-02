const express = require("express");

const router = express.Router();

const { putBus, putStation } = require("../controllers/search");

router.put("/bus", putBus);

router.put("/station", putStation);

module.exports = router;
