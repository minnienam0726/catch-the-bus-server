const Bus = require("../models/Bus");

const getStationName = async (text) => {
  const stations = await Bus.find(
    { stationName: { $regex: text } },
    "stationName",
  );

  const searchResults = stations.map((data) => data.stationName);
  const deduplicatedResults = new Set(searchResults);
  const result = [...deduplicatedResults];

  return result;
}

const getBusNumbers = async (station) => {
  const passingStationBuses = await Bus.find(
    { stationName: station },
    "busNumber",
  ).exec();

  const allPassingBuses = passingStationBuses.map((bus) => bus.busNumber);
  const deduplicatedResults = new Set(allPassingBuses);
  const passingBuses = [...deduplicatedResults];

  return passingBuses;
};

const getMinimumRoute = async (busNumber, departureStation, arrivalStation) => {
  const departure = await getNumberRoute(busNumber, departureStation);
  const arrival = await getNumberRoute(busNumber, arrivalStation);
  const gaps = [];
  for (let i = 0; i < departure.length; i++) {
    for (let j = 0; j < arrival.length; j++) {
      gaps.push(departure[i] - arrival[j]);
    }
  }

  const integer = gaps.map((gap) => Math.abs(gap));
  const MinimumGap = Math.min(...integer);

  return MinimumGap;
};

const getNumberRoute = async (busNumber, stationName) => {
  const stations = await Bus.find(
    { busNumber: busNumber, stationName: stationName },
    "routeOrder",
  ).exec();
  const numberRoute = stations.map((station) => station.routeOrder);

  return numberRoute;
};

module.exports = { getStationName, getBusNumbers, getMinimumRoute };
