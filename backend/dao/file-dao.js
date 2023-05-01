import { Product } from "../models/productModel.js";
import path from "path";

// Add an image for a product
const addCoverImage = async (file, productId) => {
  const product = await Product.findById(productId);
  console.log(product);
  console.log(productId);
  product.coverImage =
    productId + "-coverimage" + path.extname(file.originalname);
  console.log(product);
  await product.save();

  return { message: "Successsfully saved cover image" };
};

const addImages = async (files, productId) => {
  const product = await Product.findById(productId);
  console.log(product);
  console.log(productId);
  let images = [];
  let counter = 1;
  // console.log(files);
  for (const file of files) {
    images.push(productId + "-" + counter + path.extname(file.originalname));
    counter++;
  }

  product.files = images;
  await product.save();

  return { message: "Successsfully saved images" };
};

const addDownloadFiles = async (files, productId) => {
  const product = await Product.findById(productId);
  console.log(product);
  console.log(productId);
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

  product.downloadFiles = downloadFiles;
  await product.save();

  return { message: "Successsfully saved download files" };
};

export { addCoverImage, addImages, addDownloadFiles };