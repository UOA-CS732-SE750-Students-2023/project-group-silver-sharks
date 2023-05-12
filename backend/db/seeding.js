import { Account } from "../models/accountModel.js";
import { Product } from "../models/productModel.js";
import fs from "fs";
import path from "path";
import util from "util";
import { rimraf } from "rimraf";
import { ProductReview } from "../models/productReviewModel.js";
import { Message } from "../models/messageModel.js";
import { Room } from "../models/roomModel.js";

const mkdir = util.promisify(fs.mkdir);
const readdir = util.promisify(fs.readdir);
const rmdir = util.promisify(fs.rmdir);
const stat = util.promisify(fs.stat);
const copyFile = util.promisify(fs.copyFile);
const unlink = util.promisify(fs.unlink);
const rimrafAsync = util.promisify(rimraf);

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

    console.log(
      `Folder '${source}' has been copied to '${destination}' successfully.`
    );
  } catch (error) {
    console.error(`Error while copying folder: ${error.message}`);
  }
}

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
