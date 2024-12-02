import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { creatClientsController, deleteClientsController, getClientsByIdController, getClientsController, updateClientsController } from "../controllers/clientsController.js";



const router = express.Router();

router.post("/create", requireSignIn, isAdmin, creatClientsController);
router.put("/:id", requireSignIn, isAdmin, updateClientsController);
router.get("/get/:id", getClientsByIdController);
router.get("/delete/:id", requireSignIn, isAdmin, getClientsByIdController);
router.get("/get", getClientsController);
router.delete(
  "/delete/:id",
  requireSignIn,
  isAdmin,
  deleteClientsController
);

export default router;
