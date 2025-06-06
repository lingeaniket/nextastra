import cors from "cors";
import express from "express";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import roleRouter from "./routes/role.route.js";
// import enterpriseRouter from "./routes/enterprise.route.js";
import employeeRouter from "./routes/employee.route.js";
import authRouter from "./routes/auth.route.js";
import pool from "./db/config.js";
import cookieParser from "cookie-parser";
import { authToken } from "./authentication/authentication.js";

const app = express();

export const cookiesOptions = { httpOnly: true, sameSite: "None", secure: true, domain: "localhost" };

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

app.use((req, res, next) => {
    req.mysql = pool;
    next();
});
app.get("/home", (req, res) => {});

app.use("/api/users", authToken, userRouter);
app.use("/api/products", authToken, productRouter);
app.use("/api/employees", authToken, employeeRouter);
app.use("/api/roles", authToken, roleRouter);
app.use("/api/auth", authRouter);

export default app;
