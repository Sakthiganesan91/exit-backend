const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  targetDate: {
    type: Date,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model("goals", goalSchema);
