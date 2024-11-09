import mongoose from "mongoose";

const chatModel = new mongoose.Schema(
  {
    participants: [
      {
        type: String,
        ref: "user",
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  },
  { timestamps: true }
);

export default mongoose.model("chat", chatModel);
