import bcrypt from "bcrypt";

const createEmployee = async (req, res) => {
    const { mysql } = req;
    const { name, department, salary, role, enterprise } = req.body;

    if (!name || !department || !salary || !role || !enterprise) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const [resp] = await mysql.query("INSERT INTO tblemployees(name, department, salary, role, enterpriseId) VALUES(?,?,?,?,?)", [name, department, Number(salary), role, Number(enterprise)]);

        const [employees] = await mysql.query(
            `SELECT tblemployees.*, tblenterprises.name AS enterpriseName 
                FROM tblemployees 
                LEFT JOIN tblenterprises 
                    ON tblenterprises.id = tblemployees.enterpriseId WHERE tblemployees.id=?`,
            [resp.insertId],
        );
        return res.status(201).json({ message: "Employee created successfully", employee: employees[0] });
    } catch (error) {
        console.error("Error creating employee:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getEmployee = async (req, res) => {};

const listEmployees = async (req, res) => {
    const { mysql } = req;
    try {
        const [employees] = await mysql.query(
            `SELECT tblemployees.*, tblenterprises.name AS enterpriseName 
                FROM tblemployees
                LEFT JOIN tblenterprises ON tblemployees.enterpriseId = tblenterprises.id`,
        );

        const [enterprises] = await mysql.query("SELECT * FROM tblenterprises");
        return res.status(200).json({ employees, enterprises });
    } catch (error) {
        console.error("Error fetching employees:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteEmployee = async (req, res) => {
    const { mysql } = req;

    try {
        const { id } = req.params;
        const [resp] = await mysql.query("DELETE FROM tblemployees WHERE id = ?", [Number(id)]);
        res.json({ message: "Deleted", id: Number(id) });
    } catch (error) {
        console.error("Error deleteing employee:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export { createEmployee, getEmployee, listEmployees, deleteEmployee };
