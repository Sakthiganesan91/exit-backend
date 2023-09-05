const DietTrace = require("../models/dietTrace");

const getDietTrace = async (req, res) => {
  const userId = req.user._id;
  try {
    const dietTrace = await DietTrace.find({ userId });

    res.status(201).json({
      dietTrace,
    });
  } catch (error) {
    res.status(401).json({
      error: error,
    });
  }
};

const addDietTrace = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const createdAt = Date.now();
  const userId = req.user._id;

  try {
    await DietTrace.create({
      title,
      description,
      createdAt,
      userId,
    });

    res.status(201).json({
      message: "diet-trace created successfully",
    });
  } catch (error) {
    res.status(401).json({
      message: error,
    });
  }
};

const updateDietTrace = async (req, res) => {
  const _id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const updatedAt = Date.now();

  try {
    const diet = await DietTrace.findById({ _id });

    if (!diet) {
      throw new Error("something wrong");
    }
    await DietTrace.findByIdAndUpdate(
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

const deleteDietTrace = async (req, res) => {
  const _id = req.params.id;

  try {
    await DietTrace.findByIdAndDelete({ _id });

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
  getDietTrace,
  addDietTrace,
  deleteDietTrace,
  updateDietTrace,
};
