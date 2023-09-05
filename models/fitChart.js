const mongoose = require("mongoose");

const fitChartSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  subtitle: {
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

module.exports = mongoose.model("fitchart", fitChartSchema);
