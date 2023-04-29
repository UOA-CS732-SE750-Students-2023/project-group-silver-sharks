import { Account } from "../models/accountModel.js";
import { Product } from "../models/productModel.js";


// return all accounts in the database
const getAllAccounts = async () => {

    const accounts = await Account.find();

    // determine the number of results being returned
    const count = await Account.countDocuments({})

    return {accounts, count};
};

const getAccountById = async (id) => {
    const account = await Account.findById(id);
    return account;
};

const deleteAccount = async (id) => {
    await Account.findByIdAndDelete(id);
};

const getPurchasedProductsById = async (id) => {
    try {
      const account = await Account.findById(id).populate('productsPurchased');
      if (!account) {
        throw new Error('Account not found');
      }
      return account.productsPurchased;
    } catch (err) {
      console.error(err);
      throw new Error('Account not found');
    }
  };

const getSellingProductsById = async (id) => {
    try {
      const account = await Account.findById(id).populate('sellingProducts');
      if (!account) {
        throw new Error('Account not found');
      }
      return account.sellingProducts;
    } catch (err) {
      console.error(err);
      throw new Error('Account not found');
    }
  };

  const getCartContents = async (id) => {
    try {
      const account = await Account.findById(id).populate('cartContents');
      if (!account) {
        throw new Error('Account not found');
      }
      return account.cartContents;
    } catch (err) {
      console.error(err);
      throw new Error('Account not found');
    }
  };

  const registerAccountWithProduct = async (accountId, productId) => {
    const product = await Product.findById(productId);
    const account = await Account.findById(accountId);

    console.log("the account id is: " + accountId)

    product.author = account;

    console.log("----------------------------------------")
    console.log(product);
    console.log("----------------------------------------")

    await product.save();
  }


export {
    getAllAccounts,
    getAccountById,
    deleteAccount,
    getSellingProductsById,
    getPurchasedProductsById,
    getCartContents,
    registerAccountWithProduct
};