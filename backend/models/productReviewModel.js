import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productReviewSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  message: String,
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  rating: Number,
  timestamp: Date,
});

export const ProductReview = mongoose.model(
  "ProductReview",
  productReviewSchema
);
