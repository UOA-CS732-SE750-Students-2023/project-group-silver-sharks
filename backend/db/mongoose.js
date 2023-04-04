import mongoose from "mongoose";
import { connectionString } from "./config.js";

mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Error connecting to database" + error));

export default mongoose;
