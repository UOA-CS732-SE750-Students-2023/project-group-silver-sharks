import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["Images", "Videos", "Music", "Services"],
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
    files: [
      {
        fileName: {
          type: String,
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    amountSold: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductReview",
      },
    ],
    downloadLink: {
      encryptedInformation: String,
    },
    author:{
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
  },
  {
    timestamps: {},
  }
);

export const Product = mongoose.model("Product", productSchema);