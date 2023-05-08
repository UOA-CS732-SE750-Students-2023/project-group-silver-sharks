import express from "express";
import { StatusCodes } from "http-status-codes";
import passport from "passport";
import session from "express-session";
import { Room } from "../models/roomModel.js";
import { Account } from "../models/accountModel.js";
import { Product } from "../models/productModel.js";
import mongoose from "mongoose";
import { Message } from "../models/messageModel.js";

const chatRouter = new express.Router();

// Middle-ware function to ensure authentication of endpoints
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.username) {
      return next();
    } else {
      return res.status(428).send({
        message: `Please select a username ${req.user._id}`,
        id: req.user._id,
      });
    }
  } else {
    return res.status(401).send({ message: "Unauthorizedd" });
  }
}

chatRouter.use(
  session({ secret: "cats", resave: false, saveUninitialized: true })
);
chatRouter.use(passport.initialize());
chatRouter.use(passport.session());

/**
 * Endpoint 1: POST /chat
 * Either creates a room if one doesn’t exist between 2 users, or gets it if it does exist
 */
chatRouter.post("/chat", isLoggedIn, async (req, res) => {
  let { account1, account2 } = req.body;
  if (account1 == 0) {
    account1 = req.user.id;
  }
  if (account2 == 0) {
    account2 = req.user.id;
  }
  let room = await Room.findOne({
    $or: [
      { account1: account1, account2: account2 },
      { account1: account2, account2: account1 },
    ],
  });

  if (!room) {
    room = new Room({ account1, account2 });
    await room.save();
  }

  res.status(200).json({ roomId: room._id });
});

// 2. GET /chat/rooms
// Gets all of the current user’s rooms, ordered by most recently updated

chatRouter.get("/chat/rooms", isLoggedIn, async (req, res) => {
  const rooms = await Room.find({
    $or: [{ account1: req.user.id }, { account2: req.user.id }],
  }).sort("-updatedAt");

  res.status(200).json({ rooms: rooms });
});

// 3. GET /chat/rid/{rid}/messages
// Get all messages from a room (given room id), ordered by timestamp)
chatRouter.get("/chat/rid/:rid/messages", isLoggedIn, async (req, res) => {
  const { rid } = req.params;

  const room = await Room.findById(rid)
    .populate("messages")
    .sort("messages.createdAt");

  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  res.status(200).json({ messages: room.messages });
});

// 4. POST /chat/bot
// messages from our account sharketplace@gmail when the stripe transaction is successful, informing the seller that their product is successfully purchased.
chatRouter.post("/chat/bot", isLoggedIn, async (req, res) => {
  try {
    const { sellerId, productId } = req.body;

    // Checking that product Id is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid or productId" });
    }

    // Checking that seller Id exists
    const account = await Account.findById(sellerId);
    if (!account) {
      return res.status(404).json({ message: "Seller's account not found" });
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

    const buyerAccount = await Account.findById(req.user.id);
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

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Error sending message: " + error.message });
  }
});

export default chatRouter;
