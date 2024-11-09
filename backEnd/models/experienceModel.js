import mongoose from "mongoose";

const jobExperienceSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
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
      default: null, // null indicates current job
    },
    currentJob: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
    achievments: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Freelance"],
      default: "Full-time",
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    user: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobExperience = mongoose.model("JobExperience", jobExperienceSchema);

export default JobExperience;
