const FitChart = require("../models/fitChart");

const getFitChart = async (req, res) => {
  const userId = req.user._id;
  try {
    const fitCharts = await FitChart.find({ userId });

    res.status(201).json({
      fitCharts,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const addFitChart = async (req, res) => {
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const time = req.body.time;
  const description = req.body.description;
  const userId = req.user._id;
  const createdAt = Date.now();

  try {
    await FitChart.create({
      title,
      subtitle,
      time,
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

const updateFitChart = async (req, res) => {
  const _id = req.params.id;
  const title = req.body.title;
  const time = req.body.time;
  const subtitle = req.body.subtitle;
  const description = req.body.description;
  const userId = req.user._id;
  const updatedAt = Date.now();

  try {
    const fitChart = await FitChart.findOne({ _id });

    if (!fitChart) {
      throw new Error("diet not found");
    }
    await FitChart.findOneAndUpdate(
      { _id },
      {
        title,
        subtitle,
        time,
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

const deleteFitChart = async (req, res) => {
  const _id = req.params.id;

  const fitChart = await FitChart.findOne({ _id });

  if (!fitChart) {
    throw new Error("diet not found");
  }

  try {
    await FitChart.findOneAndDelete({ _id });

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
  getFitChart,
  addFitChart,
  updateFitChart,
  deleteFitChart,
};
