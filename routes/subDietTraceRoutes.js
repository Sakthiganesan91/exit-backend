const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { SubDietTrace } = require("../models/subDietTrace");
const DietTrace = require("../models/dietTrace");

const routes = express.Router();

const DIR = "./public/diet";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const id = uuidv4();
    const fileName = `${id} ${file.originalname
      .toLowerCase()
      .split(" ")
      .join("-")}`;
    cb(null, fileName);
  },
});
var fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/mpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};
const imageUpload = multer({ storage: storage, fileFilter: fileFilter });

routes.get("/get-sub-diet-trace", async (req, res) => {
  try {
    const dietTrace = await SubDietTrace.find({});

    res.status(201).json({
      dietTrace,
    });
  } catch (error) {
    res.status(401).json({
      error: error,
    });
  }
});

routes.post(
  "/add-sub-diet-trace/:id",
  imageUpload.single("dietImage"),
  async (req, res) => {
    const _id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.file.path;

    const createdAt = Date.now();

    try {
      const sub_diet_trace = await SubDietTrace.create({
        title,
        description,
        imageUrl,
        createdAt,
      });

      const dietTrace = await DietTrace.findOne({ _id });

      if (!dietTrace) {
        throw new Error("diet not found");
      }
      dietTrace.subDietTrace.push(sub_diet_trace);

      dietTrace.save();

      res.status(201).json({
        message: "sub-diet-trace created successfully",
      });
    } catch (error) {
      res.status(401).json({
        message: error,
      });
    }
  }
);

routes.put(
  "/update-sub-diet-trace/:id",
  imageUpload.single("dietImage"),
  async (req, res) => {
    const _id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.file.path;
    const parentId = req.body.parentId;
    const updatedAt = Date.now();

    try {
      const dietTrace = await DietTrace.findOne({ _id: parentId });
      if (!dietTrace) {
        throw new Error("diet not found");
      }

      const updatedSubDietTrace = await SubDietTrace.findOneAndUpdate(
        { _id },
        {
          title,
          description,
          imageUrl,
          updatedAt,
        },
        { new: true }
      );

      const subDietIndex = dietTrace.subDietTrace.findIndex(
        (diet) => diet._id.toString() === _id
      );

      if (subDietIndex !== -1) {
        dietTrace.subDietTrace[subDietIndex] = updatedSubDietTrace;
      }

      dietTrace.save();

      res.status(201).json({
        message: "updated successfully",
      });
    } catch (error) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
);

routes.delete("/delete-sub-diet-trace/:id", async (req, res) => {
  const _id = req.params.id;

  const parentId = req.body.parentId;

  try {
    const dietTrace = await DietTrace.findOne({ _id: parentId });
    const subDiet = await SubDietTrace.findOne({ _id });
    if (!dietTrace || !subDiet) {
      throw new Error("diet not found");
    }

    dietTrace.subDietTrace = dietTrace.subDietTrace.filter(
      (diet) => diet._id.toString() !== _id
    );

    dietTrace.save();

    res.status(201).json({
      message: "deleted successfully",
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
});

module.exports = routes;
