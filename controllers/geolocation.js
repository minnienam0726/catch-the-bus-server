const { numericalRange } = require("../utils/geolocationPlugin");
const Bus = require("../models/Bus");

const postGeolocation = async (req, res, next) => {
  const wholeXCoordinate = req.body.geolocation.coords.longitude;
  const wholeYCoordinate = req.body.geolocation.coords.latitude;
  const x = numericalRange(wholeXCoordinate);
  const y = numericalRange(wholeYCoordinate);

  const stations = await Bus.find(
    {
      xCoordinate: { $lte: x.minimum, $gte: x.maximum },
      yCoordinate: { $lte: y.minimum, $gte: y.maximum },
    },
    "stationName",
  );

  const allStations = stations.map((station) => station.stationName);
  const deduplicatedResults = new Set(allStations);
  const departureStations = [...deduplicatedResults];

  const payload = departureStations;

  res.json({ payload });
};

module.exports = { postGeolocation };
