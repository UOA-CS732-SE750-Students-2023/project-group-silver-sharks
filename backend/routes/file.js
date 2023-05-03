import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import archiver from "archiver";
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

// Endpoint 2: POST - Upload files for Videos, Music, or Images
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

// Endpoint 3: GET - Download product files on client side
fileRouter.get("/download/:productId", async (req, res) => {
  console.log(req.params.productId);
  const productId = req.params.productId;
  const directoryPath = "./public/downloadFiles";

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Unable to scan directory" });
    }

    const filteredFiles = files.filter((file) => file.includes(productId));

    // Create a zip archive
    const archive = archiver("zip");
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=product_files.zip`
    );

    archive.pipe(res);

    // Add the filtered files to the archive
    for (const file of filteredFiles) {
      const filePath = path.join(directoryPath, file);
      archive.append(fs.createReadStream(filePath), { name: file });
    }

    // Finalize the archive
    archive.finalize();
  });
});

export default fileRouter;
