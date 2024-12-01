import mongoose from "mongoose";

const aboutMeSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User", 
        required: true,
      },
      resume: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completedProjects: {
      type: Number,
      required: true,
    },
    ongoingProjects: {
      type: Number,
      required: true,
    },
    
    remeningProjects: {
        type: Number,
        required: true,
      },
      webPercentage: {
        type: Number,
        required: true,
      },
      designPercentage: {
        type: Number,
        required: true,
      },
      animationPercentage: {
        type: Number,
        required: true,
      },
   
  },
  {
    timestamps: true,
  }
);

const AboutMe = mongoose.model("AboutMe", aboutMeSchema);
export default AboutMe;
