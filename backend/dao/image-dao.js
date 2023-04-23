import { ObjectId } from "mongodb";
import { Image } from "../models/imageModel.js";

// Add an image for a product
const addImage = async (image) => {
  const newImage = new Image(image);
  console.log(newImage);
  await newImage.save();
  return newImage;
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

export { addImage, getImages };
