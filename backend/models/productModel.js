import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  category: String,
  name: String,
  description: String,
  timestamp: Date,
  coverImage: {
    type: Schema.Types.ObjectId,
    ref: "Image",
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  price: Number,
  amountSold: Number,
  averageRating: Number,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductReview",
    },
  ],
  downloadLink: {
    encryptedInformation: String,
  },
});

export const Product = mongoose.model("Product", productSchema);
