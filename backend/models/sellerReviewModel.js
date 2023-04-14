import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sellerReviewSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  rating: Number,
},{
  timestamps: {}
});

export const SellerReview = mongoose.model("SellerReview", sellerReviewSchema);
