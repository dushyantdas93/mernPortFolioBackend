import express from "express"
import formidable from "express-formidable"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js"
import { createProductController, deleteProductController, filterProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from "../controllers/priductController.js";

const router = express.Router()
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);


router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);
router.delete("/product-filter", filterProductController);


export default router