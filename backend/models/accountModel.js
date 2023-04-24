import mongoose from "mongoose";

const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    firstName: String,
    lastName: String,
    email: String,
    accountType: {
      type: String,
      enum: ["admin", "normal"],
      default: "normal",
      validateBeforeSave: true,
    },
    sellerRating: Number,
    sellerReviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "SellerReview",
      },
    ],
    productsPurchased: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    sellingProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    cartContents: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    }],
  },
  {
    timestamps: {},
  }
);

export const Account = mongoose.model("Account", accountSchema);
