const pool = require("../db/db");
const {
    mockProducts,
    mockRentals
} = require("../db/mockDb");


// =========================
// CREATE RENTAL
// =========================

const createRental = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            productId,
            quantity,
            startDate,
            endDate
        } = req.body;

        // -------------------------
        // VALIDATION
        // -------------------------

        if (
            !productId ||
            !quantity ||
            !startDate ||
            !endDate
        ) {
            return res.status(400).json({
                message:
                    "Product, quantity, start date and end date are required"
            });
        }

        if (quantity <= 0) {
            return res.status(400).json({
                message: "Quantity must be greater than 0"
            });
        }

        if (new Date(endDate) < new Date(startDate)) {
            return res.status(400).json({
                message:
                    "Return date cannot be before start date"
            });
        }


        // =========================
        // MOCK DATABASE MODE
        // =========================

        if (process.env.USE_MOCK_DB === "true") {

            const product = mockProducts.find(
                (p) => p.id === Number(productId)
            );

            // Product doesn't exist
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            // Insufficient stock
            if (
                product.available_quantity < quantity
            ) {
                return res.status(400).json({
                    message: "Insufficient stock",
                    availableQuantity:
                        product.available_quantity
                });
            }

            const start = new Date(startDate);
            const end = new Date(endDate);

            const duration =
                Math.ceil(
                    (end - start) /
                    (1000 * 60 * 60 * 24)
                ) || 1;

            const rentalAmount =
                Number(product.price_per_day) *
                duration *
                quantity;

            const depositAmount =
                Number(product.security_deposit) *
                quantity;

            const rental = {
                id: mockRentals.length + 1,

                user_id: userId,

                product_id: product.id,

                product_name: product.name,

                quantity,

                start_date: startDate,

                end_date: endDate,

                duration,

                rental_amount: rentalAmount,

                deposit_amount: depositAmount,

                status: "active"
            };

            mockRentals.push(rental);

            // Decrease stock
            product.available_quantity -= quantity;

            // Update product status
            if (product.available_quantity === 0) {
                product.status = "unavailable";
            }

            return res.status(201).json({
                message:
                    "Rental created successfully",

                rental,

                remainingStock:
                    product.available_quantity
            });
        }


        // =========================
        // REAL POSTGRESQL MODE
        // =========================

        const client = await pool.connect();

        try {

            const productResult = await client.query(
                "SELECT * FROM products WHERE id = $1",
                [productId]
            );

            if (productResult.rows.length === 0) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            const product = productResult.rows[0];

            if (
                product.available_quantity < quantity
            ) {
                return res.status(400).json({
                    message: "Insufficient stock",
                    availableQuantity:
                        product.available_quantity
                });
            }

            const start = new Date(startDate);
            const end = new Date(endDate);

            const duration =
                Math.ceil(
                    (end - start) /
                    (1000 * 60 * 60 * 24)
                ) || 1;

            const rentalAmount =
                Number(product.price_per_day) *
                duration *
                quantity;

            const depositAmount =
                Number(product.security_deposit) *
                quantity;

            await client.query("BEGIN");

            const orderResult = await client.query(
                `INSERT INTO rental_orders
                (
                    user_id,
                    start_date,
                    end_date,
                    rental_amount,
                    deposit_amount
                )
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
                [
                    userId,
                    startDate,
                    endDate,
                    rentalAmount,
                    depositAmount
                ]
            );

            const rentalOrder =
                orderResult.rows[0];

            await client.query(
                `INSERT INTO rental_items
                (
                    rental_order_id,
                    product_id,
                    quantity,
                    price_per_day
                )
                VALUES ($1, $2, $3, $4)`,
                [
                    rentalOrder.id,
                    productId,
                    quantity,
                    product.price_per_day
                ]
            );

            await client.query(
                `UPDATE products
                 SET available_quantity =
                     available_quantity - $1
                 WHERE id = $2`,
                [
                    quantity,
                    productId
                ]
            );

            await client.query("COMMIT");

            res.status(201).json({
                message:
                    "Rental created successfully",

                rental: rentalOrder,

                duration,

                rentalAmount,

                depositAmount
            });

        } catch (error) {

            await client.query("ROLLBACK");

            throw error;

        } finally {

            client.release();
        }

    } catch (error) {

        console.error(
            "Create rental error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to create rental"
        });
    }
};


// =========================
// GET USER RENTALS
// =========================

const getMyRentals = async (req, res) => {

    try {

        const userId = req.user.id;

        // MOCK MODE
        if (process.env.USE_MOCK_DB === "true") {

            const rentals =
                mockRentals.filter(
                    (rental) =>
                        rental.user_id === userId
                );

            return res.json(rentals);
        }

        // REAL DATABASE
        const result = await pool.query(
            `SELECT *
             FROM rental_orders
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [userId]
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Failed to fetch rentals"
        });
    }
};

const returnRental = async (req, res) => {
    try {
        const rentalId = Number(req.params.id);
        const userId = req.user.id;

        // =========================
        // MOCK DATABASE MODE
        // =========================

        if (process.env.USE_MOCK_DB === "true") {

            const rental = mockRentals.find(
                (r) => r.id === rentalId
            );

            if (!rental) {
                return res.status(404).json({
                    message: "Rental not found"
                });
            }

            // Only owner can return it
            if (
                rental.user_id !== userId &&
                req.user.role !== "admin"
            ) {
                return res.status(403).json({
                    message: "Not authorized to return this rental"
                });
            }

            // Already returned
            if (rental.status === "returned") {
                return res.status(400).json({
                    message: "Rental already returned"
                });
            }

            const product = mockProducts.find(
                (p) => p.id === rental.product_id
            );

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            // Return stock
            product.available_quantity += rental.quantity;

            if (product.available_quantity > 0) {
                product.status = "available";
            }

            rental.status = "returned";
            rental.returned_at = new Date();

            return res.json({
                message: "Rental returned successfully",
                rental,
                availableQuantity:
                    product.available_quantity
            });
        }


        // =========================
        // REAL POSTGRESQL MODE
        // =========================

        const client = await pool.connect();

        try {

            const rentalResult = await client.query(
                `SELECT *
                 FROM rental_orders
                 WHERE id = $1`,
                [rentalId]
            );

            if (rentalResult.rows.length === 0) {
                return res.status(404).json({
                    message: "Rental not found"
                });
            }

            const rental = rentalResult.rows[0];

            // Ownership check
            if (
                rental.user_id !== userId &&
                req.user.role !== "admin"
            ) {
                return res.status(403).json({
                    message: "Not authorized to return this rental"
                });
            }

            if (rental.status === "returned") {
                return res.status(400).json({
                    message: "Rental already returned"
                });
            }

            const itemsResult = await client.query(
                `SELECT product_id, quantity
                 FROM rental_items
                 WHERE rental_order_id = $1`,
                [rentalId]
            );

            await client.query("BEGIN");

            for (const item of itemsResult.rows) {

                await client.query(
                    `UPDATE products
                     SET available_quantity =
                         available_quantity + $1
                     WHERE id = $2`,
                    [
                        item.quantity,
                        item.product_id
                    ]
                );
            }

            await client.query(
                `UPDATE rental_orders
                 SET status = 'returned'
                 WHERE id = $1`,
                [rentalId]
            );

            await client.query("COMMIT");

            res.json({
                message:
                    "Rental returned successfully"
            });

        } catch (error) {

            await client.query("ROLLBACK");

            throw error;

        } finally {

            client.release();
        }

    } catch (error) {

        console.error(
            "Return rental error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to return rental"
        });
    }
};

module.exports = {
    createRental,
    getMyRentals,
    returnRental
};