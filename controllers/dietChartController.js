const DietChart = require("../models/dietChart");

const getDietCharts = async (req, res) => {
  const userId = req.user._id;
  try {
    const dietCharts = await DietChart.find({ userId });

    res.status(201).json({
      dietCharts,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};
const addDietChart = async (req, res) => {
  const meal = req.body.meal;
  const foodItem = req.body.foodItem;
  const description = req.body.description;
  const userId = req.user._id;
  const createdAt = Date.now();

  try {
    await DietChart.create({
      meal,
      foodItem,
      description,
      createdAt,
      userId,
    });

    res.status(201).json({
      message: "created Successfully",
    });
  } catch (error) {
    res.status(201).json({
      error: error.message,
    });
  }
};

const updateDietChart = async (req, res) => {
  const _id = req.params.id;
  const meal = req.body.meal;
  const foodItem = req.body.foodItem;
  const description = req.body.description;
  const userId = req.user._id;
  const updatedAt = Date.now();

  try {
    const dietChart = await DietChart.findOne({ _id });

    if (!dietChart) {
      throw new Error("diet not found");
    }
    await DietChart.findOneAndUpdate(
      { _id },
      {
        meal,
        foodItem,
        description,
        updatedAt,
        userId,
      }
    );

    res.status(201).json({
      message: "updated Successfully",
    });
  } catch (error) {
    res.status(201).json({
      error: error.message,
    });
  }
};

const deleteDietChart = async (req, res) => {
  const _id = req.params.id;

  const dietChart = await DietChart.findOne({ _id });

  if (!dietChart) {
    throw new Error("diet not found");
  }

  try {
    await DietChart.findOneAndDelete({ _id });

    res.status(201).json({
      message: "deleted Successfully",
    });
  } catch (error) {
    res.status(201).json({
      error: error.message,
    });
  }
};

module.exports = {
  getDietCharts,
  addDietChart,
  updateDietChart,
  deleteDietChart,
};
