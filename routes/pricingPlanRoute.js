import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  creatPricingPlanController,
  deletePricingPlanByIdController,
  deletePricingPlanController,
  getPricingPlanByIdController,
  getPricingPlanController,
  updatePricingPlanController,
} from "../controllers/pricingPlanController.js";

const router = express.Router();

router.post("/create", requireSignIn, isAdmin, creatPricingPlanController);
router.put("/:id", requireSignIn, isAdmin, updatePricingPlanController);
router.get("/get/:id", getPricingPlanByIdController);
router.get("/delete/:id", deletePricingPlanByIdController);
router.get("/get", getPricingPlanController);
router.delete(
  "/delete/:id",
  requireSignIn,
  isAdmin,
  deletePricingPlanController
);

export default router;
