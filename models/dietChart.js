const mongoose = require("mongoose");

const dietChartSchema = new mongoose.Schema({
  meal: {
    type: String,
    required: true,
  },
  foodItem: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },

  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("dietchart", dietChartSchema);
