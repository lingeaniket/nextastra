// db.js - Connection Manager
import mysql from "mysql2/promise"; // Promise-based API
import dotenv from "dotenv";

dotenv.config();

const { MYSQL_USER: user, MYSQL_DB: database, MYSQL_HOST: host, MYSQL_PASSWORD: password } = process.env;

const pool = mysql.createPool({
    host,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10, // Adjust based on your needs
    queueLimit: 0,
});

export default pool;
