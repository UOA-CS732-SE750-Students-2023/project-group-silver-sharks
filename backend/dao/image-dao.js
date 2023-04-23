import { Image } from "../models/imageModel.js";

const getAllImages = async () => {
  const images = await Image.find();

  const count = await Image.countDocuments();

  return { images, count };
};

const addImage = async (image) => {
  const newImage = new Image(image);
  console.log(newImage);
  await newImage.save();
  return newImage;
};

export { getAllImages, addImage };
