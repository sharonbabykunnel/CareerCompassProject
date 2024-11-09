import mongoose from "mongoose";

const EducationSchema = mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    grade: {
      type: String,
      trim: true,
    },
    activity: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
    },
    isOngoing: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("education", EducationSchema);