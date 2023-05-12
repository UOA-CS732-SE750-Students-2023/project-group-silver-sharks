import express from "express";
import connectDB from "./db/mongoose.js";
import * as url from "url";
import path from "path";
import productRouter from "./routes/product.js";
import accountRouter from "./routes/account.js";
import chatRouter from "./routes/chat.js";
import "./auth.js";
import authRouter from "./routes/authentication.js";
import fileRouter from "./routes/file.js";
import http from "http";
import { Server } from "socket.io";
import { Message } from "./models/messageModel.js";
import { Room } from "./models/roomModel.js";
import stripeRouter from "./routes/stripe.js";
import importDataFromFile from "./db/seeding.js";

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
connectDB();

// UNCOMMENT THIS LINE IF YOU WANT TO REPOPULATE DATABASE USING JSON FILE
// importDataFromFile();

// Set up endpoint routers
app.use(productRouter);
app.use(accountRouter);
app.use(authRouter);
app.use(fileRouter);
app.use(stripeRouter);
app.use(chatRouter);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

const dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use(express.static(path.join(dirname, "./public")));

if (process.env.NODE_ENV === "production") {
  console.log("Running in production!");

  app.use(express.static(path.join(dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(dirname, "../frontend/dist/index.html"));
  });
}

// Socket IO functionaity for messaging
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", async (data) => {
    // Save the message to the database
    let newMessage;
    try {
      newMessage = new Message({
        content: data.content,
        senderId: data.senderId,
        receiverId: data.receiverId,
      });

      await newMessage.save();
    } catch (error) {
      console.log("Error saving message:", error);
    }

    // Add the message to the room's messages array
    try {
      await Room.findOneAndUpdate(
        {
          $or: [
            { account1: data.senderId, account2: data.receiverId },
            { account1: data.receiverId, account2: data.senderId },
          ],
        },
        { $push: { messages: newMessage._id } },
        { new: true, useFindAndModify: false }
      );
    } catch (error) {
      console.log("Error adding message to room:", error);
    }

    // Emit the message to the room
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server has started listening on port ${PORT}`);
});
