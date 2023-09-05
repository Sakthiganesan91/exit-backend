const express = require("express");
const fitTraceController = require("../controllers/fitTraceController");
const requireAuth = require("../middleware/authMiddleware");
const routes = express.Router();

routes.use(requireAuth);

routes.get("/get-fit-trace", fitTraceController.getFitTrace);

routes.post("/add-fit-trace", fitTraceController.addFitTrace);

routes.put("/update-fit-trace/:id", fitTraceController.updateFitTrace);

routes.delete("/delete-fit-trace/:id", fitTraceController.deleteFitTrace);

module.exports = routes;
