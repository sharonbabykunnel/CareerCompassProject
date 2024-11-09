import mongoose from "mongoose";

const skillSchema = mongoose.Schema(
  {
    skills: [
      {
        skill: {
          type: String,
          required: true,
          trim: true,
        },
        from: {
          type: [],
        },
      },
    ],
    user: {
      type: String,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('skill', skillSchema);