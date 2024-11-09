import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profilePhoto: {
      type: String,
    },
    coverPhoto: {
      type: String,
    },
    position: {
      type:String,
    },
    about: {
      type:String,
    },
    pronouns: {
      type:String,
    },
    industry: {
      type:String
    },
    isBlocked: {
      type:Boolean
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("User", userSchema);
