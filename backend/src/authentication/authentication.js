import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET: secretKey } = process.env;

const cookiesOptions = { httpOnly: true, sameSite: "None", secure: true, domain: "localhost" };

const generateAccessToken = (userid, role) => jwt.sign({ userid, role }, secretKey, { expiresIn: "1h" });

const authToken = (req, res, next) => {
    const { accessToken } = req.cookies;
    // console.log(accessToken);
    if (!accessToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        jwt.verify(accessToken, secretKey, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Tokens are expired or invalid" });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export { generateAccessToken, authToken, cookiesOptions };
