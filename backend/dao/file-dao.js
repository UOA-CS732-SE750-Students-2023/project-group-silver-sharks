import { Product } from "../models/productModel.js";
import path from "path";

// Add image data for a product in the database
const addCoverImage = async (file, productId) => {
  const product = await Product.findById(productId);
  product.coverImage =
    productId + "-coverimage" + path.extname(file.originalname);
  await product.save();

  return { message: "Successsfully saved cover image" };
};

// Add download files data for a product in the database
const addDownloadFiles = async (files, productId) => {
  const product = await Product.findById(productId);
  let downloadFiles = [];
  let counter = 1;
  for (const file of files) {
    downloadFiles.push(
      productId +
        "-" +
        counter +
        "-downloadFile" +
        path.extname(file.originalname)
    );
    counter++;
  }

  product.files = downloadFiles;
  await product.save();

  return { message: "Successsfully saved download files" };
};

export { addCoverImage, addDownloadFiles };
