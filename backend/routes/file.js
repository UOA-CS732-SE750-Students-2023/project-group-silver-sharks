import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import archiver from "archiver";
import { StatusCodes } from "http-status-codes";
import { addCoverImage, addDownloadFiles } from "../dao/file-dao.js";
import { Product } from "../models/productModel.js";

const fileRouter = new express.Router();

// multer to save cover images
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

// file counter function to ensure download files are saved with
// a correct filename
async function prepareFileCounter(req, res, next) {
  const productId = req.params.productId;

  // Get the list of files in the destination folder
  const files = await fs.promises.readdir("./public/downloadFiles");

  // Filter the files that belong to the current productId
  const productFiles = files.filter((file) => file.startsWith(`${productId}-`));

  // Calculate the new file count based on existing files
  const fileCount = productFiles.length + 1;

  req.fileCount = fileCount;
  next();
}

// multer to save product download files
const downloadFileStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/downloadFiles");
  },
  filename: function (req, file, callback) {
    const productId = req.params.productId;
    const fileCount = req.fileCount;
    const extension = path.extname(file.originalname);

    const newFilename = `${productId}-${fileCount}-downloadFile${extension}`;
    req.fileCount++; // Increment the file count for the next file
    callback(null, newFilename);
  },
});

const downloadFileUpload = multer({ storage: downloadFileStorage });

/**
 * 1. POST - Save Product Cover Image
 */
fileRouter.post(
  "/upload-coverimage/:productId",
  coverImageUpload.array("files"),
  async (req, res) => {
    const productId = req.params.productId;
    const fileType = path.extname(Object.values(req.files)[0].originalname);
    // Only save valid file types
    if (
      fileType === ".jpeg" ||
      fileType === ".jpg" ||
      fileType === ".png" ||
      fileType === ".gif" ||
      fileType === ".svg"
    ) {
      await addCoverImage(Object.values(req.files)[0], req.params.productId);
    } else {
      await fs.promises.unlink(
        "./public/uploads/" + productId + "-coverimage" + fileType
      );
      await Product.findByIdAndDelete(req.params.productId);
      return res
        .status(StatusCodes.UNSUPPORTED_MEDIA_TYPE)
        .json({ message: "Unsupported file type" });
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: "file uploaded successfully" });
  }
);

/**
 * 2: POST - Upload Product Download files for Videos, Music or Images
 */
fileRouter.post(
  "/upload-downloadfiles/:productId",
  prepareFileCounter,
  downloadFileUpload.array("files"),
  async (req, res) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    const productCategory = product.category;
    let fileTypes = [];

    for (const file of req.files) {
      fileTypes.push(path.extname(file.originalname));
    }

    if (productCategory === "Images") {
      for (const fileType of fileTypes) {
        // Ensure file types are valid
        if (
          fileType != ".jpeg" &&
          fileType != ".jpg" &&
          fileType != ".png" &&
          fileType != ".gif" &&
          fileType != ".svg"
        ) {
          let counter = 1;
          for (const file of req.files) {
            const currentFileType = path.extname(file.originalname);
            await fs.promises.unlink(
              "./public/downloadFiles/" +
                productId +
                "-" +
                counter +
                "-downloadFile" +
                currentFileType
            );
            counter++;
          }
          await Product.findByIdAndDelete(req.params.productId);
          return res
            .status(StatusCodes.UNSUPPORTED_MEDIA_TYPE)
            .json({ message: "Unsupported file type" });
        }
      }

      await addDownloadFiles(req.files, req.params.productId);
    } else if (productCategory === "Music") {
      for (const fileType of fileTypes) {
        // Ensure file types are valid
        if (fileType != ".mp3" && fileType != ".mp4" && fileType != ".wav") {
          let counter = 1;
          for (const file of req.files) {
            const currentFileType = path.extname(file.originalname);
            await fs.promises.unlink(
              "./public/downloadFiles/" +
                productId +
                "-" +
                counter +
                "-downloadFile" +
                currentFileType
            );
            counter++;
          }
          await Product.findByIdAndDelete(req.params.productId);
          return res
            .status(StatusCodes.UNSUPPORTED_MEDIA_TYPE)
            .json({ message: "Unsupported file type" });
        }
      }

      await addDownloadFiles(req.files, req.params.productId);
    } else if (productCategory === "Videos") {
      for (const fileType of fileTypes) {
        // Ensure file types are valid
        if (fileType != ".mp4" && fileType != ".m4v") {
          let counter = 1;
          for (const file of req.files) {
            const currentFileType = path.extname(file.originalname);
            await fs.promises.unlink(
              "./public/downloadFiles/" +
                productId +
                "-" +
                counter +
                "-downloadFile" +
                currentFileType
            );
            counter++;
          }
          await Product.findByIdAndDelete(req.params.productId);
          return res
            .status(StatusCodes.UNSUPPORTED_MEDIA_TYPE)
            .json({ message: "Unsupported file type" });
        }
      }

      await addDownloadFiles(req.files, req.params.productId);
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "file uploaded successfully" });
  }
);

/**
 * 3: GET - Send Product Files to Client
 */
// Endpoint 3: GET - Download product files on client side
fileRouter.get("/download/:productId", async (req, res) => {
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
