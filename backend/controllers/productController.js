const pool = require("../db/db");
const { mockProducts } = require("../db/mockDb");

// =========================
// GET ALL PRODUCTS
// =========================

const getProducts = async (req, res) => {
    try {
        // Demo mode
        if (process.env.USE_MOCK_DB === "true") {
            return res.json(mockProducts);
        }

        // Real PostgreSQL mode
        const result = await pool.query(
            `SELECT *
             FROM products
             ORDER BY id`
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Get products error:", error);

        res.status(500).json({
            message: "Failed to fetch products"
        });
    }
};


// =========================
// CREATE PRODUCT - ADMIN
// =========================

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

        // Required fields
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

        // Validation
        if (
            pricePerDay < 0 ||
            securityDeposit < 0 ||
            totalQuantity < 0
        ) {
            return res.status(400).json({
                message: "Values cannot be negative"
            });
        }

        // Demo mode
        if (process.env.USE_MOCK_DB === "true") {

            const newProduct = {
                id: mockProducts.length + 1,
                name,
                description: description || "",
                category: category || "General",
                price_per_day: Number(pricePerDay),
                security_deposit: Number(securityDeposit),
                total_quantity: Number(totalQuantity),
                available_quantity: Number(totalQuantity),
                status:
                    Number(totalQuantity) > 0
                        ? "available"
                        : "unavailable"
            };

            mockProducts.push(newProduct);

            return res.status(201).json({
                message: "Product created successfully",
                product: newProduct
            });
        }

        // Real PostgreSQL mode
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
        console.error("Create product error:", error);

        res.status(500).json({
            message: "Failed to create product"
        });
    }
};


// =========================
// EXPORT
// =========================

module.exports = {
    getProducts,
    createProduct
};