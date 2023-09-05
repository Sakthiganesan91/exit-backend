const express = require("express");
const dietTraceController = require("../controllers/dietTraceController");
const requireAuth = require("../middleware/authMiddleware");
const routes = express.Router();

routes.use(requireAuth);
routes.get("/get-diet-trace", dietTraceController.getDietTrace);

routes.post("/add-diet-trace", dietTraceController.addDietTrace);

routes.put("/update-diet-trace/:id", dietTraceController.updateDietTrace);

routes.delete("/delete-diet-trace/:id", dietTraceController.deleteDietTrace);

module.exports = routes;
