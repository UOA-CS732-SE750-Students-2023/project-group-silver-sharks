import express from "express";
import { Message } from "../models/messageModel.js";
import passport from "passport";

const messageRouter = express.Router();

// endpoint to send message
messageRouter.post("/message", passport.authenticate("session"), (req, res) => {
  const { content, receiverId } = req.body;
  const senderId = req.user._id;

  const message = new Message({ content, senderId, receiverId });
  message
    .save()
    .then((savedMessage) => res.json(savedMessage))
    .catch((err) => res.status(400).json(err));
});

// endpoint to get messages
messageRouter.get("/message/:userId", passport.authenticate("session"), (req, res) => {
  const userId = req.params.userId;
  const senderId = req.user._id;

  Message.find({
    $or: [
      { senderId: senderId, receiverId: userId },
      { senderId: userId, receiverId: senderId },
    ],
  })
    .sort({ createdAt: 1 }) // sort by creation time
    .then((messages) => res.json(messages))
    .catch((err) => res.status(400).json(err));
});

export default messageRouter;
