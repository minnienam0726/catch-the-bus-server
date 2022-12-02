const {
  getStationName,
  getBusNumbers,
  getMinimumRoute,
} = require("../utils/searchPlugin");

const putStation = async (req, res, next) => {
  try {
    const inputText = req.body.text;

    if (!inputText) {
      return;
    }

    const result = await getStationName(inputText);
    const sortedResult = result.sort();

    let payload = sortedResult;
    sortedResult.length > 4
      ? (payload = sortedResult.slice(0, 15))
      : (payload = sortedResult);

    res.status(200).json({ payload });
  } catch (error) {
    next(error);
  };
};

const putBus = async (req, res, next) => {
  try {
    const stations = req.body.stations;
    const passingDepartureBuses = await getBusNumbers(stations.departure);
    const passingArrivalBuses = await getBusNumbers(stations.arrival);

    const boardingBuses = passingDepartureBuses.filter((data) =>
      passingArrivalBuses.includes(data),
    );

    const allMinimumRoute = {};
    for (let i = 0; i < boardingBuses.length; i++) {
      const minimumRoutes = await getMinimumRoute(
        boardingBuses[i],
        stations.departure,
        stations.arrival,
      );
      allMinimumRoute[boardingBuses[i]] = minimumRoutes;
    }

    const payload = allMinimumRoute;
    res.status(200).json({ payload });
  } catch (error) {
    next(error);
  };
};

module.exports = { putStation, putBus };
