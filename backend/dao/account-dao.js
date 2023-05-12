import { Account } from "../models/accountModel.js";
import { Product } from "../models/productModel.js";

// return all accounts in the database
const getAllAccounts = async () => {
  const accounts = await Account.find();

  // determine the number of results being returned
  const count = await Account.countDocuments({});

  return { accounts, count };
};

// returns a specific account based on ID
const getAccountById = async (id) => {
  const account = await Account.findById(id)
    .populate("sellingProducts")
    .populate("productsPurchased")
    .populate("cartContents");
  return account;
};

// deletes specific account based on ID
const deleteAccount = async (id) => {
  await Account.findByIdAndDelete(id);
};

// gets an account's purchased products
const getPurchasedProductsById = async (id) => {
  try {
    const account = await Account.findById(id).populate("productsPurchased");
    if (!account) {
      throw new Error("Account not found");
    }
    return account.productsPurchased;
  } catch (err) {
    console.error(err);
    throw new Error("Account not found");
  }
};

// gets an account's selling products
const getSellingProductsById = async (id) => {
  try {
    const account = await Account.findById(id).populate("sellingProducts");
    if (!account) {
      throw new Error("Account not found");
    }
    return account.sellingProducts;
  } catch (err) {
    console.error(err);
    throw new Error("Account not found");
  }
};

// gets the current cart contents of an account
const getCartContents = async (id) => {
  try {
    const account = await Account.findById(id).populate("cartContents");
    if (!account) {
      throw new Error("Account not found");
    }
    return account.cartContents;
  } catch (err) {
    console.error(err);
    throw new Error("Account not found");
  }
};

// register's an account with a product when a product is listed
const registerAccountWithProduct = async (accountId, productId) => {
  const product = await Product.findById(productId);
  const account = await Account.findById(accountId);
  product.author = account;
  await product.save();
};

export {
  getAllAccounts,
  getAccountById,
  deleteAccount,
  getSellingProductsById,
  getPurchasedProductsById,
  getCartContents,
  registerAccountWithProduct,
};
