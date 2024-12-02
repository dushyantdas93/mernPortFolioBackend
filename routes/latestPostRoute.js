import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { creatLatestPostController, deleteLatestPostController, getLatestPostByIdController, getLatestPostController, updateLatestPostController } from "../controllers/latestPostController.js";

const router = express.Router();

router.post("/create", requireSignIn, isAdmin, creatLatestPostController);
router.put("/update/:id", requireSignIn, isAdmin, updateLatestPostController);
router.get("/get/:id", getLatestPostByIdController);
router.get("/get", getLatestPostController);
router.delete("/delete/:id", requireSignIn, isAdmin, deleteLatestPostController);

export default router;
