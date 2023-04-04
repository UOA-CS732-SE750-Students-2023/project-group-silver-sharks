import mongoose from "mongoose";

const Image = mongoose.model("Image", {
  id: {
    type: "String",
    unique: true,
  },
  imgHash: "String",
  productId: {
    type: "Schema.Types.ObjectId",
    ref: "Products",
  },
});

module.exports = Image;
