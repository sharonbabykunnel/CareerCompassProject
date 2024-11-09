import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      ref: "user",
    },
    content: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    contentType: {
      type: String,
      required: true,
      default: "text",
      enum: ["text", "image", "video", "audio","post"],
    },
    readBy: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
      default: Date.now,
    },
    chat: {
      type: String,
      ref: "chat",
      required: true,
    },
    reaction: {
      type: String,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    tagg: {
      type: String,
    },
  },
  { timestamps: true }
);

// Export the model using ES6 syntax
export default mongoose.model("message", messageSchema);
