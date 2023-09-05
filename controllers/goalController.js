const Goal = require("../models/goal");

const getGoals = async (req, res) => {
  const userId = req.user._id;

  try {
    const goals = await Goal.find({ userId });

    res.status(201).json({
      goals,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const addGoal = async (req, res) => {
  const userId = req.user._id;
  const targetDate = req.body.targetDate;
  const title = req.body.title;
  const createdAt = Date.now();

  try {
    await Goal.create({
      title,
      targetDate,
      createdAt,
      userId,
    });

    res.status(201).json({
      message: "goal created successfully",
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const updateGoal = async (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  const targetDate = req.body.targetDate;
  const title = req.body.title;
  const isComplete = req.body.isComplete;
  const updatedAt = Date.now();

  try {
    const goal = await Goal.findOne({ _id });

    if (!goal) {
      throw new Error("goal not found");
    }
    await Goal.findOneAndUpdate(
      { _id },
      {
        title,
        isComplete,
        targetDate,
        updatedAt,
        userId,
      }
    );

    res.status(201).json({
      message: "goal updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const deleteGoal = async (req, res) => {
  const _id = req.params.id;

  try {
    const goal = await Goal.findOne({ _id });

    if (!goal) {
      throw new Error("goal not found");
    }
    await Goal.findOneAndDelete({ _id });

    res.status(201).json({
      message: "goal delete successfully",
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

module.exports = {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
};
