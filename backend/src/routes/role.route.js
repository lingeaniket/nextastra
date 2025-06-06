import express from "express";
import authorize from "../middlewares/authorize.middleware.js";
import { createRole, deleteRole, getRole, listRoles } from "../controllers/role.controller.js";

const router = express.Router();

router.get("/", authorize(["Admin"]), listRoles);
router.get("/:id", authorize(["Admin", "User"]), getRole);
router.post("/", authorize(["Admin"]), createRole);
router.delete("/:id", authorize(["Admin"]), deleteRole);

export default router;
