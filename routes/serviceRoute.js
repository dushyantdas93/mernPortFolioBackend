import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  createServiceController,
  deleteServiceController,
  getServiceByIdController,
  getServicesController,
  updateServiceController,
} from "../controllers/serviceController.js";

const router = express.Router();

router.post("/create", requireSignIn, isAdmin, createServiceController);
router.put(
  "/:id",
  requireSignIn,
  isAdmin,
  updateServiceController
);
router.get("/get/:id", getServiceByIdController);
router.get("/get", getServicesController);
router.delete("/delete/:id", requireSignIn, isAdmin, deleteServiceController);

export default router;
