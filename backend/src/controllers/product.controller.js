import bcrypt from "bcrypt";

const createProduct = async (req, res) => {
    const { mysql } = req;
    const { name, sku, category, price } = req.body;

    if (!name || !sku || !category || !price) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const [resp] = await mysql.query("INSERT INTO tblproducts(name, sku, category, price) VALUES(?,?,?,?)", [name, sku, Number(category), Number(price)]);

        const [products] = await mysql.query("SELECT * FROM tblproducts WHERE id=?", [resp.insertId]);
        return res.status(201).json({ message: "Product created successfully", product: products[0] });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getUser = async (req, res) => {};

const listProducts = async (req, res) => {
    const { mysql } = req;
    try {
        // Assuming User is a model imported from your models directory
        const [products] = await mysql.query(
            `SELECT tblproducts.*, tblcategories.name AS categoryName 
                FROM tblproducts
                LEFT JOIN tblcategories ON tblcategories.id = tblproducts.category`,
        );
        // const users = await User.findAll();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteProduct = async (req, res) => {
    const { mysql } = req;

    try {
        const { id } = req.params;
        const [resp] = await mysql.query("DELETE FROM tblproducts WHERE id = ?", [Number(id)]);
        res.json({ message: "Deleted", id: Number(id) });
    } catch (error) {
        console.error("Error deleteing product:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export { createProduct, getUser, listProducts, deleteProduct };
