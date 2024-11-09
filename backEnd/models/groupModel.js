import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: String,
        ref: "user",
      },
    ],
    communityPicture: {
      type: String,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
    groupName: {
      type: String,
      required: true, // Fixed typo from 'require' to 'required'
    },
    groupDiscrip: {
      type: String,
    },
    admins: [
      {
        type: String,
        ref: "user",
      },
    ],
    state: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("group", groupSchema);
