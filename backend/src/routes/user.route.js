import express from "express";
import { createUser, deleteUser, listUsers, getUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.get("/", authorize(["Admin"]), listUsers);
router.get("/:id", authorize(["Admin", "User"]), getUser);
router.post("/", authorize(["Admin"]), createUser);
router.delete("/:id", authorize(["Admin"]), deleteUser);

export default router;
