import mongoose from "mongoose";
import { Account } from "../models/accountModel.js";
import { Product } from "../models/productModel.js";
import { ObjectId } from "mongoose";
import fs from "fs";
import { ProductReview } from "../models/productReviewModel.js";
import { Message } from "../models/messageModel.js";

async function importDataFromFile() {
  // Cleanup previous data
  await Account.deleteMany({});
  await Product.deleteMany({});
  await ProductReview.deleteMany({});

  // Read data from JSON file
  const data = JSON.parse(fs.readFileSync("./db/data.json", "utf-8"));
  console.log(data);

  // Import accounts
  for (const accountData of data.Accounts) {
    const account = new Account(accountData);
    await account.save();
  }

  // Import products
  for (const productData of data.Products) {
    const product = new Product(productData);
    await product.save();
  }
}

export default importDataFromFile;
