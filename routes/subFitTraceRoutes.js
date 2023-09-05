const express = require("express");
const multer = require("multer");

const { v4: uuidv4 } = require("uuid");

const { SubFitTrace } = require("../models/subFitTrace");
const FitTrace = require("../models/FitTrace");
const routes = express.Router();

const DIR = "./public/fitness";
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

routes.get("/get-sub-fit-trace", async (req, res) => {
  try {
    const fitTrace = await SubFitTrace.find({});

    res.status(201).json({
      fitTrace,
    });
  } catch (error) {
    res.status(401).json({
      error: error,
    });
  }
});

routes.post(
  "/add-sub-fit-trace/:id",
  imageUpload.single("fitImage"),
  async (req, res) => {
    const _id = req.params.id;
    const title = req.body.title;
    const time = req.body.time;
    const description = req.body.description;
    const imageUrl = req.file.path;
    const createdAt = Date.now();

    try {
      const sub_fit_trace = await SubFitTrace.create({
        title,
        description,
        imageUrl,
        time,
        createdAt,
      });

      const fitTrace = await FitTrace.findOne({ _id });

      if (!fitTrace) {
        throw new Error("fit not found");
      }
      fitTrace.subFitTrace.push(sub_fit_trace);

      fitTrace.save();

      res.status(201).json({
        message: "sub-fit-trace created successfully",
      });
    } catch (error) {
      res.status(401).json({
        message: error,
      });
    }
  }
);

routes.put(
  "/update-sub-fit-trace/:id",
  imageUpload.single("fitImage"),
  async (req, res) => {
    const _id = req.params.id;
    const title = req.body.title;
    const time = req.body.time;
    const description = req.body.description;
    const imageUrl = req.file.path;
    const parentId = req.body.parentId;
    const updatedAt = Date.now();

    try {
      const fitTrace = await FitTrace.findOne({ _id: parentId });
      if (!fitTrace) {
        throw new Error("fit not found");
      }

      const updatedSubFitTrace = await SubFitTrace.findOneAndUpdate(
        { _id },
        {
          title,
          time,
          description,
          imageUrl,
          updatedAt,
        },
        { new: true }
      );

      const subFitIndex = fitTrace.subFitTrace.findIndex(
        (fit) => fit._id.toString() === _id
      );

      if (subFitIndex !== -1) {
        fitTrace.subFitTrace[subFitIndex] = updatedSubFitTrace;
      }

      fitTrace.save();

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

routes.delete("/delete-sub-fit-trace/:id", async (req, res) => {
  const _id = req.params.id;

  const parentId = req.body.parentId;

  try {
    const fitTrace = await FitTrace.findOne({ _id: parentId });
    const subFit = await SubFitTrace.findOne({ _id });
    if (!fitTrace || !subFit) {
      throw new Error("fit not found");
    }

    fitTrace.subFitTrace = fitTrace.subFitTrace.filter(
      (fit) => fit._id.toString() !== _id
    );

    fitTrace.save();

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
