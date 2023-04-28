import { Product } from "../models/productModel.js";
import { getAccountById } from "./account-dao.js";

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
  let sortCriteria = { createdAt: 1 };

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
  let sortCriteria = { createdAt: 1 };

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

const registerProductWithAccount = async (productId, accountId) => {
  // get the account instance
  const account = await getAccountById(accountId);
  
  // register the product with the account
  account.sellingProducts.push(productId);

  console.log(account);

  await account.save();

  // return the account id so that the product can register it
  return account._id;
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
  return await Product.findById(id);
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
  registerProductWithAccount
};
