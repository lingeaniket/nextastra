import express from "express";
import authorize from "../middlewares/authorize.middleware.js";
import { createEmployee, deleteEmployee, listEmployees } from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/", authorize(["Admin"]), listEmployees);
// router.get("/:id", getEmployee);
router.post("/", createEmployee);
router.delete("/:id", authorize(["Admin"]), deleteEmployee);

export default router;
