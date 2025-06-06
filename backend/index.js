import app from "./src/app.js";
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
import pool from "./src/db/config.js";

const PORT = process.env.PORT || 3000;

// const { MYSQL_USER: user, MYSQL_DB: database, MYSQL_HOST: host, MYSQL_PASSWORD: password } = process.env;

async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ MySQL connection established");
        connection.release();
    } catch (error) {
        console.error("❌ MySQL connection failed:", error.message);
        process.exit(1); // Exit if DB connection fails
    }
}

// Start server
async function startServer() {
    await initializeDatabase();

    // app.use((req, res, next) => {});

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
}

startServer();
