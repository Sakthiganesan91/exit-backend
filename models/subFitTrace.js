const mongoose = require("mongoose");

const subFitTraceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    reqired: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const SubFitTrace = mongoose.model("subfittrace", subFitTraceSchema);
module.exports = {
  SubFitTrace,
  subFitTraceSchema,
};
