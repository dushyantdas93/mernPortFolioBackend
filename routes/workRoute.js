import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  creatWorkController,
  deleteWorkController,
  getWorkByIdController,
  getWorkController,
  updateWorkController,
} from "../controllers/workController.js";

const router = express.Router();

router.post("/create", requireSignIn, isAdmin, creatWorkController);
router.put("/:id", requireSignIn, isAdmin, updateWorkController);
router.get("/get/:id",  getWorkByIdController);
router.get("/get", getWorkController);
router.delete("/delete/:id", requireSignIn, isAdmin, deleteWorkController);

export default router;
