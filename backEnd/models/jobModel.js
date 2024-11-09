import mongoose  from "mongoose";

const jobPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    salarymin: {
      type: Number,
      min: 0,
    },
    slaarymax:{
        type: Number,
        min:0
    },
    experience:{
        type: Number,
        min:0
    },
    immidiate:{
        type: Boolean,
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Other", "Internship"],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["Entry-level", "Mid-level", "Senior", "Executive"],
      required: true,
    },
    workplaceType: {
      type: String,
      enum: ["On-site", "Hybrid", "Remote"],
      require: true,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    deadline: {
      type: Date,
    },
    postedBy: {
      type: String,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    industry: {
      type:String
    },
    selected: [],
    removedUsers:[]
  },
  {
    timestamps: true,
  }
);

const JobPost = mongoose.model("JobPost", jobPostSchema);

export default JobPost;
