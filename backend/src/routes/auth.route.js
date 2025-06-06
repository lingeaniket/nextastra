import express from "express";
import { login } from "../controllers/auth.controller.js";
import { authToken } from "../authentication/authentication.js";

const router = express.Router();

router.get("/", authToken, (req, res) => {
    res.json({ status: "success", username: req.user.username, modules: req.user.modules });
});

router.post("/login", login);

export default router;
