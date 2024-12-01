import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { creatWorkController, deleteWorkController, getWorkController } from "../controllers/workController.js";


const router = express.Router();

router.post("/create", requireSignIn, isAdmin, creatWorkController);
// router.put("/update/:id", requireSignIn, isAdmin, updateAboutMeController);
// router.get("/get/:id", requireSignIn, isAdmin, getAboutMeByIdController);
router.get("/get", getWorkController);
router.delete("/delete/:id", requireSignIn, isAdmin, deleteWorkController);

export default router;
