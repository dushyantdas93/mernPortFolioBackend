import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createAboutMeController, deleteAboutMeController, getAboutMeByIdController, getAboutMeController, updateAboutMeController } from "../controllers/aboutMeController.js";

const router = express.Router();

router.post("/create", requireSignIn, isAdmin, createAboutMeController);
router.put("/:id", requireSignIn, isAdmin, updateAboutMeController);
router.get("/get/:id",  getAboutMeByIdController);
router.get("/get", getAboutMeController);
router.delete("/delete/:id", requireSignIn, isAdmin, deleteAboutMeController);

export default router;
