import bcrypt from "bcrypt";

const createUser = async (req, res) => {
    const { mysql } = req;
    const { name, email, password, roleId, enterprise } = req.body;

    if (!name || !email || !password || !roleId || !enterprise) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const storePass = await bcrypt.hash(password, 10);

        const [resp] = await mysql.query("INSERT INTO tblusers(name, email, password, roleId, enterpriseId) VALUES(?,?,?,?,?)", [name, email, storePass, Number(roleId), Number(enterprise)]);

        const [users] = await mysql.query(
            `
            SELECT tblusers.*, tblenterprises.name AS enterpriseName, tblroles.name AS roleName 
                FROM tblusers 
                LEFT JOIN tblenterprises ON tblusers.enterpriseId = tblenterprises.id 
                LEFT JOIN tblroles ON tblusers.roleId = tblroles.id 
                WHERE tblusers.id=?`,
            [resp.insertId],
        );
        return res.status(201).json({ message: "User created successfully", user: users[0] });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    const { mysql } = req;

    if (!id) {
        return res.status(403).json({ message: "No user found" });
    }

    try {
        const [users] = await mysql.query(
            `SELECT tblusers.*, tblroles.name AS roleName, tblenterprises.name AS enterpriseName
                FROM tblusers
                LEFT JOIN tblroles ON tblroles.id = tblusers.roleId
                LEFT JOIN tblenterprises ON tblusers.enterpriseId = tblenterprises.id WHERE tblusers.id=?
                `,
            [Number(id)],
        );

        const [roles] = await mysql.query(`SELECT * FROM tblroles`);
        const [enterprises] = await mysql.query(`SELECT * FROM tblenterprises`);

        return res.json({ user: users[0], roles, enterprises });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const listUsers = async (req, res) => {
    const { mysql } = req;
    try {
        const [users] = await mysql.query(
            `SELECT tblusers.*, tblroles.name AS roleName, tblenterprises.name AS enterpriseName
                FROM tblusers
                LEFT JOIN tblroles ON tblroles.id = tblusers.roleId
                LEFT JOIN tblenterprises ON tblusers.enterpriseId = tblenterprises.id`,
        );
        const [enterprises] = await mysql.query("SELECT * FROM tblenterprises");
        const [roles] = await mysql.query("SELECT * FROM tblroles");

        return res.status(200).json({ users, enterprises, roles });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteUser = async (req, res) => {
    const { mysql } = req;

    try {
        const { id } = req.params;
        const [resp] = await mysql.query("DELETE FROM tblusers WHERE id = ?", [Number(id)]);
        res.json({ message: "Deleted", id: Number(id) });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export { createUser, getUser, listUsers, deleteUser };
