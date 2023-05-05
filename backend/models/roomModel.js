import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    account1: {
      type: String,
      ref: "Account",
      required: true,
    },
    account2: {
      type: String,
      ref: "Account",
      required: true,
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: {},
  }
);

export const Room = mongoose.model(
  "Room",
  roomSchema
);