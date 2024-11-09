import mongoose from "mongoose";

const resumeSchema = mongoose.Schema(
  {
    resume: String,
    isActive: Boolean,
    user: {
      type: String,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('resume', resumeSchema);