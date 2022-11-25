const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busNumber: { type: String },
  routeOrder: { type: Number },
  stationNumber: { type: String },
  stationName: { type: String },
  xCoordinate: { type: Number },
  yCoordinate: { type: Number },
});

module.exports = mongoose.model("Bus", busSchema);
