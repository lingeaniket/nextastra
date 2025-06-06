import bcrypt from "bcrypt";

const createRole = async (req, res) => {
    const { mysql } = req;
    const { name, moduledata } = req.body;
    const modules = ["role", "user", "enterprise", "dashboard", "employee", "product"];

    if (!name || !moduledata) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const [resp] = await mysql.query("INSERT INTO tblroles(name) VALUES(?)", [name]);

        const roleId = resp.insertId;

        modules.forEach(async (modulename) => {
            if (moduledata[modulename].status) {
                const { create, read, update, delete: canDelete } = moduledata[modulename];
                const [data] = await mysql.query(
                    `INSERT INTO tblpermissions(module, canCreate, canRead, canUpdate, canDelete, roleId)
                    VALUES(?,?,?,?,?,?)`,
                    [modulename, create ? 1 : 0, read ? 1 : 0, update ? 1 : 0, canDelete ? 1 : 0, roleId],
                );
            }
        });
        const [roles] = await mysql.query(`SELECT * FROM tblroles WHERE id=?`, [resp.insertId]);
        const { id, name } = roles[0];
        return res.status(201).json({ message: "User created successfully", role: { id, name } });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getRole = async (req, res) => {
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

const listRoles = async (req, res) => {
    const { mysql } = req;
    try {
        // const [roles] = await mysql.query(`SELECT * FROM tblroles`);
        const [roles] = await mysql.query(`SELECT r.*, GROUP_CONCAT(p.module SEPARATOR ', ') AS modules FROM tblroles r
            LEFT JOIN
                tblpermissions p ON p.roleId = r.id
            GROUP BY r.id
            `);

        return res.status(200).json({ roles });
    } catch (error) {
        console.error("Error fetching roles:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteRole = async (req, res) => {
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

export { createRole, getRole, listRoles, deleteRole };
