import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productReviewSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    account: {
      type: String,
      ref: "Account",
    },
  },
  {
    timestamps: {},
  }
);

export const ProductReview = mongoose.model(
  "ProductReview",
  productReviewSchema
);