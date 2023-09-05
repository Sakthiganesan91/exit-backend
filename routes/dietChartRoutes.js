const express = require("express");
const dietChartController = require("../controllers/dietChartController");
const requireAuth = require("../middleware/authMiddleware");
const routes = express.Router();

routes.use(requireAuth);
routes.get("/get-diet-chart", dietChartController.getDietCharts);

routes.post("/add-diet-chart", dietChartController.addDietChart);

routes.put("/update-diet-chart/:id", dietChartController.updateDietChart);

routes.delete("/delete-diet-chart/:id", dietChartController.deleteDietChart);

module.exports = routes;
