import express from "express";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { addCoverImage, getImages, addImages } from "../dao/image-dao.js";

const imageRouter = new express.Router();

const coverImageStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    const productId = req.query.productId;
    const extension = path.extname(file.originalname);
    const newFilename = productId + "-coverimage" + extension;
    callback(null, newFilename);
  },
});

const coverImageUpload = multer({ storage: coverImageStorage });

const imageStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: (function () {
    let fileCount = 1;

    return function (req, file, callback) {
      const productId = req.query.productId;
      const extension = path.extname(file.originalname);
      const newFilename = `${productId}-${fileCount}${extension}`;
      fileCount++;
      callback(null, newFilename);
    };
  })(),
});

const imageUpload = multer({ storage: imageStorage });

// Endpoint 1: POST - Cover Image
imageRouter.post(
  "/upload-coverimage",
  coverImageUpload.array("files"),
  async (req, res) => {
    console.log(req.query.productId);
    console.log(req.files);
    await addCoverImage(Object.values(req.files)[0], req.query.productId);
    return res
      .status(StatusCodes.OK)
      .json({ message: "file uploaded successfully" });
  }
);

// Endpoint 2: POST - Images
imageRouter.post(
  "/upload-images",
  imageUpload.array("files"),
  async (req, res) => {
    console.log(req.query.productId);
    console.log(req.files);
    await addImages(req.files, req.query.productId);

    return res
      .status(StatusCodes.OK)
      .json({ message: "file uploaded successfully" });
  }
);

// Endpoint 3: GET - Get images for a specific product
// query param ?id=<id>
imageRouter.get("/images", async (req, res) => {
  const id = req.query.id;

  const isValid = mongoose.isValidObjectId(id);
  if (!isValid) {
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  try {
    const images = await getImages(id);
    return res.status(StatusCodes.OK).json(images);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// Endpoint 3: POST - Add image data
imageRouter.post("/images", async (req, res) => {
  try {
    const newImage = await addImage(req.body);

    return res
      .status(StatusCodes.CREATED)
      .header("Location", `/images/${newImage._id}`)
      .json(newImage);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default imageRouter;
