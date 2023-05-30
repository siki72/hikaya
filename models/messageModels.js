import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    text: String,
    lu: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;
