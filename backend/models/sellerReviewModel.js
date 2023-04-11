import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sellerReviewSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  message: String,
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  rating: Number,
  timestamp: Date,
});

export const SellerReview = mongoose.model("SellerReview", sellerReviewSchema);
