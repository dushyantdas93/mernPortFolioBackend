import mongoose from "mongoose";

const pricingPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    supports: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PricingPlan = mongoose.model("PricingPlan", pricingPlanSchema);
export default PricingPlan;
