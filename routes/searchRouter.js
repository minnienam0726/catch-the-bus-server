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
  searchResult.length > 4
    ? (payload = searchResult.slice(0, 5))
    : (payload = searchResult);

  res.json({ payload });
});

const departure = "동묘앞";
const arrival = "숭례문";
const capturedNumber = "105";

router.post("/bus", async (req, res, next) => {
  const stations = req.body;
  const departureBusNumbers = await getBusNumbers(departure);
  const arrivalBusNumbers = await getBusNumbers(arrival);
  const boardingBuses = departureBusNumbers.filter((data) =>
    arrivalBusNumbers.includes(data),
  );
  const allBusMinimumRoute = {};

  for (let i = 0; i < boardingBuses.length; i++) {
    const tempMinimum = await getMinimumRouteNumber(
      boardingBuses[i],
      departure,
      arrival,
    );
    allBusMinimumRoute[boardingBuses[i]] = tempMinimum;
  }

  const payload = allBusMinimumRoute;
  res.json({ payload });
});

const getBusNumbers = async (station) => {
  const busesPassingStation = await Bus.find(
    { stationName: `${station}` },
    "busNumber",
  ).exec();
  const allPassingBuses = busesPassingStation.map((bus) => bus.busNumber);
  const removeDuplicate = new Set(allPassingBuses);
  const passingBuses = [...removeDuplicate];

  return passingBuses;
};

const getRouteNumbers = async (capturedNumber, station) => {
  const stationNumbers = await Bus.find(
    { busNumber: `${capturedNumber}`, stationName: `${station}` },
    "routeOrder",
  ).exec();
  const routeNumbers = stationNumbers.map((station) => station.routeOrder);

  return routeNumbers;
};

const getMinimumRouteNumber = async (
  busNumber,
  departureStation,
  arrivalStation,
) => {
  const tempDeparture = await getRouteNumbers(busNumber, departureStation);
  const tempArrival = await getRouteNumbers(busNumber, arrivalStation);
  const gaps = [];

  for (let i = 0; i < tempDeparture.length; i++) {
    for (let j = 0; j < tempArrival.length; j++) {
      gaps.push(tempDeparture[i] - tempArrival[j]);
    }
  }

  const integer = gaps.map((gap) => Math.abs(gap));
  const MinimumGap = Math.min(...integer);

  return MinimumGap;
};

module.exports = router;
