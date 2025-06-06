import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { cookiesOptions } from "../app.js";

dotenv.config();

const { JWT_SECRET: secretKey } = process.env;

const login = async (req, res) => {
    const { mysql } = req;
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    // const user = await User.findOne({ where: { email } });
    const [users] = await mysql.query(
        `
        SELECT tblusers.*, tblroles.name AS roleName, GROUP_CONCAT(p.module SEPARATOR ', ') AS modules
            FROM tblusers 
            LEFT JOIN tblroles 
                ON tblusers.roleId = tblroles.id 
            LEFT JOIN tblpermissions p
                ON tblusers.roleId = p.roleId
            WHERE tblusers.email = ?`,
        [email],
    );
    const user = users[0];

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const { password: storedPass } = user;

    const isPassValid = await bcrypt.compare(password, storedPass);
    if (!isPassValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, roleId: user.roleId, role: user.roleName, modules: user.modules, username: user.name }, secretKey, {
        expiresIn: "1h",
    });

    res.cookie("accessToken", token, { ...cookiesOptions, maxAge: 3600000 });

    return res.status(200).json({ message: "Login successful", role: user.roleName, username: user.name, modules: user.modules });
};

export { login };
