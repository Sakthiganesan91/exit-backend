const express = require("express");
const goalController = require("../controllers/goalController");
const requireAuth = require("../middleware/authMiddleware");

const routes = express.Router();

routes.use(requireAuth);

routes.get("/get-goal", goalController.getGoals);

routes.post("/add-goal", goalController.addGoal);

routes.put("/update-goal/:id", goalController.updateGoal);

routes.delete("/delete-goal/:id", goalController.deleteGoal);

module.exports = routes;
