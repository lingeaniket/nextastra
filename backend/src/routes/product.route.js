import express from "express";
import authorize from "../middlewares/authorize.middleware.js";
import { createProduct, deleteProduct, listProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", authorize(["Admin"]), listProducts);
// router.get("/:id", getProduct);
router.post("/", createProduct);
router.delete("/:id", authorize(["Admin"]), deleteProduct);

export default router;
