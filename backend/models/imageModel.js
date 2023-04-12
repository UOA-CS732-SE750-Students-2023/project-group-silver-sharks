import mongoose from "mongoose";

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  imgHash: String,
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

export const Image = mongoose.model("Image", imageSchema);
