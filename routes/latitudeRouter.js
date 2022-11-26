const express = require("express");
const router = express.Router();
const Bus = require("../models/Bus");

router.post("/", async (req, res, next) => {
  const fullXCoordinateNumber = await req.body.geolocation.coords.longitude;
  const fullYCoordinateNumber = await req.body.geolocation.coords.latitude;
  const xCoordinateNumber = fullXCoordinateNumber.toFixed(4);
  const yCoordinateNumber = fullYCoordinateNumber.toFixed(4);

  const stations = await Bus.find(
    {
      xCoordinate: { $regex: xCoordinateNumber },
      yCoordinate: { $regex: yCoordinateNumber },
    },
    "stationName",
  );

  const allStations = stations.map((station) => station.stationName);
  const removeDuplicate = new Set(allStations);
  const departureStations = [...removeDuplicate];

  const payload = departureStations;
  res.json({ payload });
})

module.exports = router;
