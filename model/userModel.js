import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export const userModel = new mongoose.model("User", userSchema);
