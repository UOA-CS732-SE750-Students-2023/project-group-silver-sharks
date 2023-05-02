import mongoose from "mongoose";
const Schema = mongoose.Schema;
const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      ref: "Account",
      required: true,
    },
    receiverId: {
      type: String,
      ref: "Account",
      required: true,
    },
  },
  {
    timestamps: {},
  }
);

export const Message = mongoose.model("Message", messageSchema);