import express from "express";
import mongoose from "./db/mongoose.js";
const app = express();

// routes
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
