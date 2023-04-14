import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productReviewSchema = new Schema({
  message: String,
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  rating: Number,
},{
  timestamps: {}
});

export const ProductReview = mongoose.model(
  "ProductReview",
  productReviewSchema
);
