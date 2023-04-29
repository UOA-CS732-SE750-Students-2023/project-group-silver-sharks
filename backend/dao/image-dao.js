import { ObjectId } from "mongodb";
// import { Image } from "../models/imageModel.js";
import { Product } from "../models/productModel.js";

// Add an image for a product
const addCoverImage = async (imageName, productId) => {
  const product = await Product.findById(productId);
  console.log(product);
  console.log(imageName);
  console.log(productId);
  product.coverImage = imageName;
  await product.save();

  return { message: "Successsfully saved cover image" };
  // const newImage = new Image(image);
  // console.log(newImage);
  // await newImage.save();
  // return newImage;
};

// Get all images for a specific product.
const getImages = async (id) => {
  const images = await Image.find({
    productId: new ObjectId(`${id}`),
  });

  const total = await Image.countDocuments({
    productId: new ObjectId(`${id}`),
  });
  return { total, images };
};

export { addCoverImage, getImages };
