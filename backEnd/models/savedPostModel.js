import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const savedSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      default: uuidv4,
    },
    user_id: {
      type: String,
      ref: "User",
      required: true,
    },
    post_id: {
      type: String,
      ref: "Post",
      required: true,
    },
    savedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "removed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

savedSchema.index({ user_id: 1, post_id: 1 }, { unique: true });

// Export the model using ES6 syntax
export default mongoose.model("Saved", savedSchema);
