import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: { type: String, require: true },
    phone: { type: String, require: true },
    instagram: { type: String },
    image: { type: String },
    github: { type: String },
    linkedin: { type: String },
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
