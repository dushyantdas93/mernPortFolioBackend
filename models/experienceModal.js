import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User", 
        required: true,
      },
      yearOfCompletion: {
      type: Number,
      required: true,
    },
    isPresent: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    
    percentage: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      }
   
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;
