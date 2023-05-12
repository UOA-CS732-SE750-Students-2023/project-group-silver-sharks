import * as dotenv from "dotenv";
dotenv.config();

import mongoose, { connect } from "mongoose";

// function to connect to the main database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to database", err);
  }
};

export default connectDB;
