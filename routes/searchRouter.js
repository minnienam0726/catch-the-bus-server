const express = require("express");
const router = express.Router();
const Bus = require("../models/Bus");

router.post("/", async (req, res, next) => {
  const text = req.body.text;
  const stations = await Bus.find(
    { stationName: { $regex: `${text}` } },
    "stationName",
  );

  const searchValue = stations.map((data) => data.stationName);
  const removeDuplicate = new Set(searchValue);
  const searchResult = [...removeDuplicate];

  let payload;
  searchResult.length > 4 ? payload = searchResult.slice(0, 5) : payload = searchResult;

  res.json({ payload });
});


module.exports = router;
