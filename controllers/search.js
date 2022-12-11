const {
  getStationName,
  getBusNumbers,
  getMinimumRoute,
} = require("../utils/searchPlugin");

const postStation = async (req, res, next) => {
  try {
    const inputText = req.body.text;

    if (!inputText) {
      return;
    }

    const result = await getStationName(inputText);
    const sortedResult = result.sort();

    let payload = sortedResult;
    if (sortedResult.length > 4) {
      payload = sortedResult.slice(0, 15);
    } else {
      payload = sortedResult;
    }

    res.status(200).json({ payload });
  } catch (error) {
    next(error);
  };
};

const postBus = async (req, res, next) => {
  try {
    const stations = req.body.stations;
    const passingDepartureBuses = await getBusNumbers(stations.departure);
    const passingArrivalBuses = await getBusNumbers(stations.arrival);

    const boardingBuses = passingDepartureBuses.filter((data) =>
      passingArrivalBuses.includes(data),
    );

    if (Array.isArray(boardingBuses) && boardingBuses.length > 0) {
      const allMinimumRoute = {};
      for (let i = 0; i < boardingBuses.length; i++) {
        const minimumRoutes = await getMinimumRoute(
          boardingBuses[i],
          stations.departure,
          stations.arrival,
        );
        allMinimumRoute[boardingBuses[i]] = minimumRoutes;
      }

      res.status(200).json({ payload: allMinimumRoute });
    } else {
      res.status(400).json({ message: "직행 버스가 없습니다!" });
    }

  } catch (error) {
    next(error);
  };
};

module.exports = { postStation, postBus };
