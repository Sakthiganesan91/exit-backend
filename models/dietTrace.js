const mongoose = require("mongoose");
const { subDietTraceSchema } = require("./subDietTrace");
const dietTraceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subDietTrace: {
    type: [subDietTraceSchema],
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

module.exports = mongoose.model("diettrace", dietTraceSchema);
