import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  messageContent: String,
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  timestamp: Date,
});

export const Message = mongoose.model("Message", messageSchema);
