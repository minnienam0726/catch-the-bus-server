const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busNumber: { type: String },
  routeOrder: { type: Number },
  stationNumber: { type: String },
  stationName: { type: String },
  xCoordinate: { type: String },
  yCoordinate: { type: String },
});

module.exports = mongoose.model("Bus", busSchema);
