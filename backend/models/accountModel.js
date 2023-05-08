import mongoose from "mongoose";

const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    stripeId: {
      type: String,
    },
    balance: {
      // In cents, USD
      type: Number,
      default: 0,
    },
    username: {
      type: String,
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
    assetsSold: Number,
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
    cartContents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: {},
  }
);

export const Account = mongoose.model("Account", accountSchema);
