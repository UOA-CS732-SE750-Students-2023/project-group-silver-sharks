import mongoose from "mongoose";

const Product = mongoose.model("Product", {
  id: {
    type: "String",
    unique: true,
  },
  category: "String",
  name: "String",
  description: "String",
  timestamp: "Date",
  coverImage: {
    type: "Schema.Types.ObjectId",
    ref: "Images",
  },
  images: [
    {
      type: "Schema.Types.ObjectId",
      ref: "Images",
    },
  ],
  price: "Decimal",
  amountSold: "Number",
  averageRating: "Decimal",
  reviews: [
    {
      type: "Schema.Types.ObjectId",
      ref: "ProductReviews",
    },
  ],
  downloadLink: {
    encryptedInformation: "String",
  },
});

module.exports = Product;
