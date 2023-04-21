import mongoose from "mongoose";

const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    imgName: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: {},
  }
);

export const Image = mongoose.model("Image", imageSchema);
