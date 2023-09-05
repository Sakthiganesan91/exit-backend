const express = require("express");
const ToDo = require("../models/todo");
const requireAuth = require("../middleware/authMiddleware");
const routes = express.Router();

routes.use(requireAuth);
routes.get("/get-todo", async (req, res) => {
  const userId = req.user._id;

  try {
    const todos = await ToDo.find({ userId });

    res.status(201).json({
      todos,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
});

routes.post("/add-todo", async (req, res) => {
  const userId = req.user._id;
  const description = req.body.description;
  const title = req.body.title;
  const createdAt = Date.now();

  try {
    await ToDo.create({
      title,
      description,
      createdAt,
      userId,
    });

    res.status(201).json({
      message: "todo created successfully",
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
});

routes.put("/update-todo/:id", async (req, res) => {
  const _id = req.params.id;
  const userId = req.body.userId;
  const description = req.body.description;
  const title = req.body.title;
  const isComplete = req.body.isComplete;
  const updatedAt = Date.now();

  try {
    const todo = await ToDo.findOne({ _id });

    if (!todo) {
      throw new Error("todo not found");
    }
    await ToDo.findOneAndUpdate(
      { _id },
      {
        title,
        isComplete,
        description,
        updatedAt,
        userId,
      }
    );

    res.status(201).json({
      message: "todo updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
});

routes.delete("/delete-todo/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const todo = await ToDo.findOne({ _id });

    if (!todo) {
      throw new Error("todo not found");
    }
    await ToDo.findOneAndDelete({ _id });

    res.status(201).json({
      message: "todo delete successfully",
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
});

module.exports = routes;
