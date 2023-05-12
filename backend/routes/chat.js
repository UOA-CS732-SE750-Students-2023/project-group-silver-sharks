import express from "express";
import passport from "passport";
import session from "express-session";
import { Room } from "../models/roomModel.js";

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

/**
 * 2. GET /chat/rooms
 * Gets all of the current user’s rooms, ordered by most recently updated
 * */
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

export default chatRouter;
