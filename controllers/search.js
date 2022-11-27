const {
  getStationName,
  getBusNumbers,
  getMinimumRoute,
} = require("../utils/searchPlugin");

const postStation = async (req, res, next) => {
  const inputText = req.body.text;

  if (inputText === "") {
    return;
  }

  const result = await getStationName(inputText);
  const sortedResult = result.sort();

  let payload = sortedResult;
  sortedResult.length > 4
    ? (payload = sortedResult.slice(0, 15))
    : (payload = sortedResult);

  res.json({ payload });
};

const postBus = async (req, res, next) => {
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
  res.json({ payload });
};

module.exports = { postStation, postBus };
