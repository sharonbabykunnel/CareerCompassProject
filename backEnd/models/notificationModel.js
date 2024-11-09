import mongoose from "mongoose";
import { number } from "yup";

const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    recipient: {
      type: String,
      ref: "User",
      required: true,
    },
    sender: {
      type: String,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["connection", "post", "message", "job_post", "chat"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    relatedItem: {
      type: Schema.Types.ObjectId,
      refPath: "itemModel",
    },
    itemModel: {
      type: String,
      enum: ["connections", "Post", "message", "JobPost", "chat"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
