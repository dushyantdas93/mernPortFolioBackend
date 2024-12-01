import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createAboutMeController, getAboutMeController } from "../controllers/aboutMeController.js";

const router = express.Router();

router.post("/create", requireSignIn, isAdmin, createAboutMeController);
// router.put("/update/:id", requireSignIn, isAdmin, updateAboutMeController);
// router.get("/get/:id", requireSignIn, isAdmin, getAboutMeByIdController);
router.get("/get", getAboutMeController);
// router.delete("/delete/:id", requireSignIn, isAdmin, deleteAboutMeController);

export default router;
