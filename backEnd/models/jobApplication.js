import mongoose from "mongoose";

const applicationSchema = mongoose.Schema(
  {
    job: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    applicant: {
      type: String,
      require: true,
    },
    resume: {
      type: mongoose.Types.ObjectId,
      require: true,
    },
    education: [
      {
        type: mongoose.Types.ObjectId,
        require: true,
      },
    ],
    experience: [
      {
        type: mongoose.Types.ObjectId,
        require: true,
      },
    ],
    status: {
      type: String,
        default: "active",
      enum:['active','accepted','rejected']
    },
    answers: [],
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    position: {
      type: String,
      require: true,
    },
    number: {
      type: Number,
      require: true,
    },
    details: {
      date: {
        type: Date,
      },
      time: {
        type: String,
      },
      email: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('application',applicationSchema)