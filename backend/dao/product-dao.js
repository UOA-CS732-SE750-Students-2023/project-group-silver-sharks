import { Product } from "../models/productModel.js";
import { Account } from "../models/accountModel.js";
import fs from "fs";
import path from "path";

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
  let sortCriteria = { priority: -1 };

  if (sortBy === "priceLowToHigh") {
    sortCriteria = { price: 1 };
  } else if (sortBy === "priceHighToLow") {
    sortCriteria = { price: -1 };
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
  let sortCriteria = { priority: -1 };

  if (sortBy === "priceLowToHigh") {
    sortCriteria = { price: 1 };
  } else if (sortBy === "priceHighToLow") {
    sortCriteria = { price: -1 };
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
  let sortCriteria = { createdAt: 1 };

  if (sortBy === "priceLowToHigh") {
    sortCriteria = { price: 1 };
  } else if (sortBy === "priceHighToLow") {
    sortCriteria = { price: -1 };
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

  return deletedProduct;
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
};
