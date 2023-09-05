const FitTrace = require("../models/FitTrace");

const getFitTrace = async (req, res) => {
  const userId = req.user._id;
  try {
    const fitTrace = await FitTrace.find({ userId });

    res.status(201).json({
      fitTrace,
    });
  } catch (error) {
    res.status(401).json({
      error: error,
    });
  }
};

const addFitTrace = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const createdAt = Date.now();
  const userId = req.user._id;

  try {
    await FitTrace.create({
      title,
      description,
      createdAt,
      userId,
    });

    res.status(201).json({
      message: "fit-trace created successfully",
    });
  } catch (error) {
    res.status(401).json({
      message: error,
    });
  }
};

const updateFitTrace = async (req, res) => {
  const _id = req.params.id;

  const title = req.body.title;
  const description = req.body.description;
  const updatedAt = Date.now();

  try {
    const fitTrace = await FitTrace.findById({ _id });

    if (!fitTrace) {
      throw new Error("something wrong");
    }
    await FitTrace.findByIdAndUpdate(
      { _id },
      {
        title,
        description,
        updatedAt,
      }
    );

    res.status(201).json({
      message: "updated successful",
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const deleteFitTrace = async (req, res) => {
  const _id = req.params.id;

  try {
    await FitTrace.findByIdAndDelete({ _id });

    res.status(201).json({
      message: "delete successful",
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

module.exports = {
  getFitTrace,
  addFitTrace,
  updateFitTrace,
  deleteFitTrace,
};
