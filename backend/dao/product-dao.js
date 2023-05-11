import { Product } from "../models/productModel.js";
import { Account } from "../models/accountModel.js";
import { Room } from "../models/roomModel.js";
import { Message } from "../models/messageModel.js";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

// return all products in the database
const getAllProducts = async () => {
  const products = await Product.find();

  // determine the number of results being returned
  const count = await Product.countDocuments({});

  return { products, count };
};

// retrieve products from the database with pagination
// both page and limit need to be integers
const getPaginatedProducts = async (page, limit, sortBy) => {
  let sortCriteria = { priority: -1, _id: 1 }; // Featured

  if (sortBy === "priceLowToHigh") {
    sortCriteria = { price: 1, _id: 1 };
  } else if (sortBy === "priceHighToLow") {
    sortCriteria = { price: -1, _id: 1 };
  } else if (sortBy === "popularity") {
    sortCriteria = { amountSold: -1, _id: 1 };
  } else if (sortBy === "rating") {
    sortCriteria = { averageRating: -1, _id: 1 };
  }

  const products = await Product.find()
    .sort(sortCriteria)
    .skip((page - 1) * limit)
    .limit(limit);

  console.log(products);

  // determine the number of results being returned
  const count = await Product.countDocuments({});

  return { products, count };
};

const getPaginatedCategories = async (page, limit, userCategory, sortBy) => {
  let sortCriteria = { priority: -1, _id: 1 }; // Featured

  if (sortBy === "priceLowToHigh") {
    sortCriteria = { price: 1, _id: 1 };
  } else if (sortBy === "priceHighToLow") {
    sortCriteria = { price: -1, _id: 1 };
  } else if (sortBy === "popularity") {
    sortCriteria = { amountSold: -1, _id: 1 };
  } else if (sortBy === "rating") {
    sortCriteria = { averageRating: -1, _id: 1 };
  }

  const products = await Product.find({ category: { $eq: userCategory } })
    .sort(sortCriteria)
    .skip((page - 1) * limit)
    .limit(limit);

  console.log(`filtered products by ${userCategory} : ` + products);

  // determine the number of results being returned
  const count = await Product.countDocuments({
    category: { $eq: userCategory },
  });

  return { products, count };
};

const addProduct = async (product) => {
  const newProduct = new Product(product);
  console.log(newProduct);
  await newProduct.save();
  return newProduct;
};

const registerProductWithAccount = async (product, accountId) => {
  // get the account instance
  const account = await Account.findById(accountId).populate("sellingProducts");

  console.log(account.sellingProducts);

  // register the product with the account
  account.sellingProducts.push(product);

  console.log(account);

  await account.save();
};

const registerBuyingProductWithAccount = async (productId, accountId) => {
  // get account instance
  const account = await Account.findById(accountId).populate(
    "productsPurchased"
  );

  // get product instance and increment amount sold
  const product = await Product.findById(productId);
  console.log(product);
  const oldAmountSold = product.amountSold;
  console.log(oldAmountSold);
  const newAmountSold = oldAmountSold + 1;
  console.log(newAmountSold);
  product.amountSold = newAmountSold;
  console.log(product);
  await product.save();

  console.log(account.productsPurchased);

  account.productsPurchased.push(product);

  await account.save();
};

const getProductsMatchingSearchTerm = async (
  searchTerm,
  page,
  limit,
  sortBy
) => {
  let sortCriteria = { priority: -1, _id: 1 }; // Featured

  if (sortBy === "priceLowToHigh") {
    sortCriteria = { price: 1, _id: 1 };
  } else if (sortBy === "priceHighToLow") {
    sortCriteria = { price: -1, _id: 1 };
  } else if (sortBy === "popularity") {
    sortCriteria = { amountSold: -1, _id: 1 };
  } else if (sortBy === "rating") {
    sortCriteria = { averageRating: -1, _id: 1 };
  }
  // { "authors": { "$regex": "Alex", "$options": "i" } }
  const products = await Product.find({
    name: { $regex: searchTerm, $options: "i" },
  })
    .sort(sortCriteria)
    .skip((page - 1) * limit)
    .limit(limit);

  console.log("products match search query" + products);

  // determine the number of results being returned
  const count = await Product.countDocuments({
    name: { $regex: searchTerm, $options: "i" },
  });

  return { products, count };
};

const getProductById = async (id) => {
  return await Product.findById(id).populate("author");
};

const updateProduct = async (productId, updatedProductData) => {
  const existingProduct = await Product.findById(productId);

  if (!existingProduct) {
    return null;
  }

  for (const key in updatedProductData) {
    if (updatedProductData.hasOwnProperty(key)) {
      existingProduct[key] = updatedProductData[key];
    }
  }

  await existingProduct.save();
  return existingProduct;
};

const deleteProduct = async (productId) => {
  const deletedProduct = await Product.findByIdAndRemove(productId);

  if (!deletedProduct) {
    return null;
  }

  if (process.env.NODE_ENV != "backend-test") {
    // delete product cover image file
    const coverImagePath = "./public/uploads/" + deletedProduct.coverImage;
    fs.unlinkSync(coverImagePath);

    // delete product download files
    const downloadFiles = deletedProduct.files;

    for (const file of downloadFiles) {
      const currentPath = "./public/downloadFiles/" + file;
      console.log(path);
      fs.unlinkSync(currentPath);
    }

    console.log("Files removed successfully");
  }

  return deletedProduct;
};

const sendSharkbotMessage = async (sellerId, productId, requestingUserId) => {
  try {
    // Checking that product Id is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.error("Invalid or productId");
      return;
    }

    // Checking that seller Id exists
    const account = await Account.findById(sellerId);
    if (!account) {
      console.error("Seller's account not found");
      return;
    }

    // Creating/getting room with Sharkbot
    const sharkbotId = "109761511246582815438";
    let room = await Room.findOne({
      $or: [
        { account1: sharkbotId, account2: sellerId },
        { account1: sellerId, account2: sharkbotId },
      ],
    });

    let account1 = sharkbotId;
    let account2 = sellerId;
    if (!room) {
      room = new Room({ account1, account2 });
      await room.save();
    }

    // Sending message
    const senderId = sharkbotId;
    const receiverId = sellerId;

    const buyerAccount = await Account.findById(requestingUserId);
    const buyerUsername = buyerAccount.username;

    const productSold = await Product.findById(productId);
    const productName = productSold.name;
    const productPrice = productSold.price;
    const productCategory = productSold.category;

    const content = `Congratulations! Your product "${productName}" from category "${productCategory}" has been sold for $${productPrice.toFixed(
      2
    )} to "${buyerUsername}".`;

    const newMessage = new Message({ content, senderId, receiverId });
    await newMessage.save();
    room.messages.push(newMessage._id);
    await room.save();
  } catch (error) {
    console.error("Error sending message: " + error.message);
  }
};

const getLandingPageProducts = async () => {
  let finalResults = {};
  const fields = "name price coverImage amountSold";

  const imageProducts = await Product.find({ category: "Images" })
    .select(fields)
    .sort({ priority: -1, amountSold: -1 })
    .limit(3);

  const videoProducts = await Product.find({ category: "Videos" })
    .select(fields)
    .sort({ priority: -1, amountSold: -1 })
    .limit(3);

  const musicProducts = await Product.find({ category: "Music" })
    .select(fields)
    .sort({ priority: -1, amountSold: -1 })
    .limit(3);

  const serviceProducts = await Product.find({ category: "Services" })
    .select(fields)
    .sort({ priority: -1, amountSold: -1 })
    .limit(3);

  finalResults.imageProducts = imageProducts;
  finalResults.videoProducts = videoProducts;
  finalResults.musicProducts = musicProducts;
  finalResults.serviceProducts = serviceProducts;

  return finalResults;
};

export {
  getAllProducts,
  getPaginatedProducts,
  addProduct,
  getPaginatedCategories,
  getProductsMatchingSearchTerm,
  getProductById,
  updateProduct,
  deleteProduct,
  registerProductWithAccount,
  registerBuyingProductWithAccount,
  sendSharkbotMessage,
  getLandingPageProducts,
};
