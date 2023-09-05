const express = require("express");
const userController = require("../controllers/userController");

const routes = express.Router();

routes.get("/userid/:id", userController.getUserById);

routes.post("/forgot-password", userController.forgotPassword);

routes.post("/otp-verify", userController.otpVerification);

routes.post("/change-password", userController.changePassword);

module.exports = routes;
