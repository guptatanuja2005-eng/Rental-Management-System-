
const pool = require("../db/db");

const getProducts = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM products ORDER BY id"
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            message: "Failed to fetch products"
        });
    }
};

module.exports = {
    getProducts
};