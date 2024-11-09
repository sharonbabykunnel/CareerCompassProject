import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    replies: [
      {
        type: String,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: String,
        ref: "User",
      },
    ],
    mentions: [
      {
        type: String,
        ref: "User",
      },
    ],
    isEdited: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "deleted", "hidden"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", CommentSchema);
