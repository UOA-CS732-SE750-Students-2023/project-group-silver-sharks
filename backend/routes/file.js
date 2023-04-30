import express from "express";
import multer from "multer";
import path from "path";
import { StatusCodes } from "http-status-codes";
import { addCoverImage, addImages, addDownloadFiles } from "../dao/file-dao.js";

const fileRouter = new express.Router();

const coverImageStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    const productId = req.params.productId;
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
      const productId = req.params.productId;
      const extension = path.extname(file.originalname);
      const newFilename = `${productId}-${fileCount}${extension}`;
      fileCount++;
      callback(null, newFilename);
    };
  })(),
});

const imageUpload = multer({ storage: imageStorage });

const downloadFileStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/downloadFiles");
  },
  filename: (function () {
    let fileCount = 1;

    return function (req, file, callback) {
      const productId = req.params.productId;
      const extension = path.extname(file.originalname);
      const newFilename = `${productId}-${fileCount}-downloadFile${extension}`;
      fileCount++;
      callback(null, newFilename);
    };
  })(),
});

const downloadFileUpload = multer({ storage: downloadFileStorage });

// Endpoint 1: POST - Cover Image
fileRouter.post(
  "/upload-coverimage/:productId",
  coverImageUpload.array("files"),
  async (req, res) => {
    console.log(req.params.productId);
    console.log(req.files);
    await addCoverImage(Object.values(req.files)[0], req.params.productId);
    return res
      .status(StatusCodes.OK)
      .json({ message: "file uploaded successfully" });
  }
);

// Endpoint 3: POST - Upload files for Videos, Music, or Images
fileRouter.post(
  "/upload-downloadfiles/:productId",
  downloadFileUpload.array("files"),
  async (req, res) => {
    console.log(req.params.productId);
    console.log(req.files);
    await addDownloadFiles(req.files, req.params.productId);

    return res
      .status(StatusCodes.OK)
      .json({ message: "file uploaded successfully" });
  }
);

export default fileRouter;