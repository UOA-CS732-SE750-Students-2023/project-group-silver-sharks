import express from "express";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { addCoverImage, getImages } from "../dao/image-dao.js";
import { Product } from "../models/productModel.js";

const imageRouter = new express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    cb(null, req.query.filename + fileExtension);
  },
});

// Set up multer upload object
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Endpoint 1: POST - Upload image
imageRouter.post("/upload", (req, res) => {
  const coverImage = req.query.coverImage;
  console.log("coverImage is", coverImage);
  const productId = req.query.productId;
  // const fileName = req.query.fileName;

  upload(req, res, async (err) => {
    if (err) {
      console.log("Error uploading image", err);
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Error: Upload Failed!" });
    } else {
      if (req.file == undefined) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Error: No File Selected!" });
      } else {
        const imagePath = "/uploads/" + req.file.filename;
        if (coverImage) {
          await addCoverImage(req.query.filename, productId);

          res.status(StatusCodes.OK).json({
            message: "Cover Image Uploaded Successfully",
            imagePath: imagePath,
          });
        } else {
          // Update req.body with the image path
          req.body.imagePath = imagePath;

          const newImage = await addImage(req.body);
          const productId = newImage.productId;

          const product = await Product.findById(productId).populate("files");
          if (!product) {
            return res.status(404).json({ error: "Product not found" });
          }

          product.files.push(newImage);

          await product.save();

          res.status(StatusCodes.OK).json({
            message: "File Uploaded Successfully",
            imagePath: imagePath,
          });
        }
      }
    }
  });
});

// Endpoint 2: GET - Get images for a specific product
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
