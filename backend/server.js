import express from "express";
import connectDB from "./db/mongoose.js";
import * as url from "url";
import path from "path";
import productRouter from "./routes/product.js";
import accountRouter from "./routes/account.js";
import "./auth.js";
import authRouter from "./routes/authentication.js";
import fileRouter from "./routes/file.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { Message } from "./models/messageModel.js";

// 1. INITIAL SETUP

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
connectDB();

app.use(productRouter);
app.use(accountRouter);
app.use(authRouter);
app.use(fileRouter);

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

// 2. SOCKET IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join", ({ userId }) => {
    socket.join(userId);
  });

  socket.on("private message", async ({ content, senderId, receiverId }) => {
    const newMessage = await Message.create({ content, senderId, receiverId });
    socket.to(receiverId).emit("new private message", newMessage);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server has started listening on port ${PORT}`);
});
