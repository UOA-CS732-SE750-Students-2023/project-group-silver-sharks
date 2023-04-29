import mongoose from "mongoose";

const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    _id: {
      type: String, 
      required: true
    },
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
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  {
    timestamps: {},
  }
);

export const Account = mongoose.model("Account", accountSchema);
