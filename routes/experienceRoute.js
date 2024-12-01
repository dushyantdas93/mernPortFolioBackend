import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { creatExperienceController, getExperienceController } from "../controllers/experinceController.js";


const router = express.Router();

router.post("/create", requireSignIn, isAdmin, creatExperienceController);
// router.put("/update/:id", requireSignIn, isAdmin, updateAboutMeController);
// router.get("/get/:id", requireSignIn, isAdmin, getAboutMeByIdController);
router.get("/get", getExperienceController);
// router.delete("/delete/:id", requireSignIn, isAdmin, deleteAboutMeController);

export default router;
