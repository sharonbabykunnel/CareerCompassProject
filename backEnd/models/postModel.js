import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const PostSchema = new mongoose.Schema(
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
    content: {
      text: {
        type: String,
        trim: true,
      },
      images: [
        {
          type: String,
          trim: true,
        },
      ],
      video: [
        {
          type: String,
          trim: true,
        },
      ],
    },
    likes: [
      {
        type: String,
        ref: "User",
      },
    ],
    saved: [
      {
        type: String,
        ref: "User",
      },
    ],
    comments: {
      type: Number,
    },
    shares: [
      {
        type: String,
        ref: "User",
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    visibility: {
      type: String,
      enum: ["public", "friends", "private"],
      default: "public",
    },
    status: {
      type: String,
      enum: ["active", "archived", "deleted"],
      default: "active",
    },
    reposted: [
      {
        type: String,
      },
    ],
    reported: [
      {
        user: {
          type: String,
          required: true,
        },
        reason: {
          type: String,
          required: true,
        },
      },
    ],
    notInterest: [
      {
        type:String
      }
    ],
    isBlocked:Boolean
  },
  {
    timestamps: true,
  }
);

PostSchema.index({ location: "2dsphere" });

export default mongoose.model("Post", PostSchema);
