import express from "express";
import connectDB from "./db/mongoose.js";
import * as url from "url";
import path from "path";
import productRouter from "./routes/product.js";
import accountRouter from "./routes/account.js";
import messageRouter from "./routes/message.js";
import "./auth.js";
import authRouter from "./routes/authentication.js";
import cors from "cors";
import fileRouter from "./routes/file.js";
import http from "http";
import { Server } from "socket.io";
import { Message } from "./models/messageModel.js";
import passport from "passport";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());


// Connect to database
connectDB();

// register the routers
app.use(productRouter);
app.use(accountRouter);
app.use(authRouter);
app.use(fileRouter);
app.use(messageRouter);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });

});

// Make the "public" folder available statically, all the images and static files we can serve
// to the front end from this folder directly
const dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use(express.static(path.join(dirname, "./public")));

// Serve up the frontend's "dist" directory, if we're running in production mode.
if (process.env.NODE_ENV === "production") {
  console.log("Running in production!");

  // Make all files in that folder public
  app.use(express.static(path.join(dirname, "../frontend/dist")));

  // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
  app.get("*", (req, res) => {
    res.sendFile(path.join(dirname, "../frontend/dist/index.html"));
  });
}

// Create a session middleware
app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// create a http server and attach socket.io to it
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.use((socket, next) => {
  if (socket.request.user) {
    next();
  } else {
    next(new Error("Unauthorized"));
  }
});

io.on("connection", (socket) => {
  console.log("a user connected :D");
  socket.on("chat message", (msg) => {
    console.log(msg);
    io.emit("chat message", msg);
    // Save the msg in DB
    const message = new Message(msg);
    message.save();
  });
});


server.listen(PORT, () => {
  console.log(`Server has started listening on port ${PORT}`);
});