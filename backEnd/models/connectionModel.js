import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const connectionSchema = new mongoose.Schema(
  {
    connectionId: {
      type: String,
      default: uuidv4,
    },
    requester: {
      type: String,
      ref: "users",
      required: true,
    },
    recipient: {
      type: String,
      ref: "users",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    connectedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure that a user can't connect to themselves
connectionSchema.pre("save", function (next) {
  if (this.requester === this.recipient) {
    next(new Error("Users cannot connect to themselves"));
  } else {
    next();
  }
});

// Ensure unique connections
connectionSchema.index({ requester: 1, recipient: 1 }, { unique: true });

// Export the model using ES6 syntax
export default mongoose.model("connections", connectionSchema);
