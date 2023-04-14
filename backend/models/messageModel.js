import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  messageContent: String,
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
},{
  timestamps: {}
});

export const Message = mongoose.model("Message", messageSchema);
