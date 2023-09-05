const express = require("express");
const fitChartController = require("../controllers/fitChartController");
const routes = express.Router();

const requireAuth = require("../middleware/authMiddleware");

routes.use(requireAuth);

routes.get("/get-fit-chart", fitChartController.getFitChart);

routes.post("/add-fit-chart", fitChartController.addFitChart);

routes.put("/update-fit-chart/:id", fitChartController.updateFitChart);

routes.delete("/delete-fit-chart/:id", fitChartController.deleteFitChart);

module.exports = routes;
