import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User", 
        required: true,
      },
      screenshot: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },

  
   
  },
  {
    timestamps: true,
  }
);

const Work = mongoose.model("Work", workSchema);
export default Work;
