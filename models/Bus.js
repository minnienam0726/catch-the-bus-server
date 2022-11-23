const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  routeId: { type: Number },
  routeName: { type: String },
  stationId: { type: Number },
  stationNumber: { type: String },
  stationName: { type: String },
  xCoordinate: { type: Number },
  yCoordinate: { type: Number },
});

module.exports = mongoose.model("Bus", busSchema);
