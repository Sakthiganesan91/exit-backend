const mongoose = require("mongoose");
const { subFitTraceSchema } = require("./subFitTrace");
const fitTraceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subFitTrace: {
    type: [subFitTraceSchema],
    default: [],
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

module.exports = mongoose.model("fittrace", fitTraceSchema);
