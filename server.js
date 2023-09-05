const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// routes import
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const dietTraceRoutes = require("./routes/dietTraceRoutes");
const subDietTraceRoutes = require("./routes/subDietTraceRoutes");
const dietChartRoutes = require("./routes/dietChartRoutes");
const fitChartRoutes = require("./routes/fitChartRoutes");
const fitTraceRoutes = require("./routes/fitTraceRoutes");
const subFitTraceRoutes = require("./routes/subFitTraceRoutes");
const todoRoutes = require("./routes/todoRoutes");
const goalRoutes = require("./routes/goalRoutes");

require("dotenv").config();
const app = express();

app.use(cors({}));

app.use("/public", express.static("public"));
app.use(express.static("files"));
app.use(express.json());

app.use(authRoutes);
app.use("/user", userRoutes);

app.use("/diet-trace", dietTraceRoutes);
app.use("/sub-diet-trace", subDietTraceRoutes);
app.use("/diet-chart", dietChartRoutes);
app.use("/fit-chart", fitChartRoutes);
app.use("/fit-trace", fitTraceRoutes);
app.use("/sub-fit-trace", subFitTraceRoutes);
app.use("/todo", todoRoutes);
app.use("/goal", goalRoutes);

app.get("/", (req, res) => {
  res.status(201).json({
    message: "hello working ",
  });
});

mongoose
  .connect(process.env.MONGOOSE_CONNECTION_URI)
  .then(app.listen(process.env.PORT || 8080));
