const { numericalRange } = require("../utils/geolocationPlugin");
const Bus = require("../models/Bus");

const postGeolocation = async (req, res, next) => {
  try {
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

    if (Array.isArray(stations) && stations.length > 0) {
      const allStations = stations.map((station) => station.stationName);
      const deduplicatedResults = new Set(allStations);
      const departureStations = [...deduplicatedResults];

      return res.status(200).json({ payload: departureStations });
    } else {
      return res.status(400).json({ message: "주변에 정류장이 없습니다." });
    }
  } catch (error) {
    next(error);
  };
};

module.exports = { postGeolocation };
