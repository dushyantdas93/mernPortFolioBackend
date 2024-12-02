import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { creatExperienceController, deleteExperienceController, getExperienceByIdController, getExperienceController, updateExperienceController } from "../controllers/experinceController.js";


const router = express.Router();

router.post("/create", requireSignIn, isAdmin, creatExperienceController);
router.put("/update/:id", requireSignIn, isAdmin, updateExperienceController);
router.get("/get/:id", getExperienceByIdController);
router.get("/get", getExperienceController);
router.delete("/delete/:id", requireSignIn, isAdmin, deleteExperienceController);

export default router;
