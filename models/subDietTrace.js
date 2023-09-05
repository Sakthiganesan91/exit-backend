const mongoose = require("mongoose");

const subDietTraceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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

const SubDietTrace = mongoose.model("subdiettrace", subDietTraceSchema);
module.exports = {
  SubDietTrace,
  subDietTraceSchema,
};
