import mongoose from "mongoose";

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  imgName: {
    type: String,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
},{
  timestamps: {}
});

export const Image = mongoose.model("Image", imageSchema);
