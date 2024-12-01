import express from "express";
import {

  getAllController,
  getUserController,
  loginController,
  registerController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);


router.get("/getAll",requireSignIn,isAdmin, getAllController);
router.get("/getUser/:id",requireSignIn,isAdmin, getUserController);
router.put("/updateProfile/:pid",requireSignIn,isAdmin, updateProfileController);


router.get("/dashboard", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/dashboard/admin", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/test", (req, res) => {
  res.send("protected router");
});

export default router;
