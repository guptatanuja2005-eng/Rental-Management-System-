const pool = require("../db/db");

const getProducts = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM products
             ORDER BY id`
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch products"
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            pricePerDay,
            securityDeposit,
            totalQuantity
        } = req.body;

        if (
            !name ||
            pricePerDay == null ||
            securityDeposit == null ||
            totalQuantity == null
        ) {
            return res.status(400).json({
                message: "Required product details are missing"
            });
        }

        if (
            pricePerDay < 0 ||
            securityDeposit < 0 ||
            totalQuantity < 0
        ) {
            return res.status(400).json({
                message: "Values cannot be negative"
            });
        }

        const result = await pool.query(
            `INSERT INTO products
            (
                name,
                description,
                category,
                price_per_day,
                security_deposit,
                total_quantity,
                available_quantity
            )
            VALUES ($1, $2, $3, $4, $5, $6, $6)
            RETURNING *`,
            [
                name,
                description,
                category,
                pricePerDay,
                securityDeposit,
                totalQuantity
            ]
        );

        res.status(201).json({
            message: "Product created successfully",
            product: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create product"
        });
    }
};

module.exports = {
    getProducts,
    createProduct
};