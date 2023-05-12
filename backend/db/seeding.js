import { Account } from "../models/accountModel.js";
import { Product } from "../models/productModel.js";
import fs from "fs";
import path from "path";
import util from "util";
import { ProductReview } from "../models/productReviewModel.js";
import { Message } from "../models/messageModel.js";
import { Room } from "../models/roomModel.js";

const mkdir = util.promisify(fs.mkdir);
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const copyFile = util.promisify(fs.copyFile);

// fuction to delete an existing folder and its contents
function deleteFolder(folderPath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(folderPath, file), (err) => {
        if (err) throw err;
      });
    }
  });
}

// function to copy an existing folder and its contents
async function copyFolder(source, destination) {
  try {
    await mkdir(destination, { recursive: true });
    const files = await readdir(source);

    for (const file of files) {
      const srcPath = path.join(source, file);
      const destPath = path.join(destination, file);
      const fileStat = await stat(srcPath);

      if (fileStat.isDirectory()) {
        await copyFolder(srcPath, destPath);
      } else {
        await copyFile(srcPath, destPath);
      }
    }
  } catch (error) {
    console.error(`Error while copying folder: ${error.message}`);
  }
}

// add fresh new data to the database from JSON file
async function importDataFromFile() {
  // Cleanup previous data
  await Account.deleteMany({});
  await Product.deleteMany({});
  await ProductReview.deleteMany({});
  await Message.deleteMany({});
  await Room.deleteMany({});

  // Delete folders
  deleteFolder("./public/uploads");
  deleteFolder("./public/downloadFiles");

  // Copy new folders
  copyFolder("./db/uploads", "./public/uploads");
  copyFolder("./db/downloadFiles", "./public/downloadFiles");

  // Read data from JSON file
  const data = JSON.parse(fs.readFileSync("./db/data.json", "utf-8"));

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

  //Import product reviews
  for (const productReviewData of data.ProductReviews) {
    const productReview = new ProductReview(productReviewData);
    await productReview.save();
  }

  // Import messages
  for (const messageData of data.Messages) {
    const message = new Message(messageData);
    await message.save();
  }

  // Import rooms
  for (const roomData of data.Rooms) {
    const room = new Room(roomData);
    await room.save();
  }
}

export default importDataFromFile;
