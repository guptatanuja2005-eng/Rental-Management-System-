const pool = require("../db/db");

const createRental = async (req, res) => {
    const client = await pool.connect();

    try {
        const userId = req.user.id;

        const {
            productId,
            quantity,
            startDate,
            endDate
        } = req.body;

        if (!productId || !quantity || !startDate || !endDate) {
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
                message: "Return date cannot be before start date"
            });
        }

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

        if (product.available_quantity < quantity) {
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

        const rentalOrder = orderResult.rows[0];

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
            [quantity, productId]
        );

        await client.query("COMMIT");

        res.status(201).json({
            message: "Rental created successfully",
            rental: rentalOrder,
            duration,
            rentalAmount,
            depositAmount
        });

    } catch (error) {

        await client.query("ROLLBACK");

        console.error("Create rental error:", error);

        res.status(500).json({
            message: "Failed to create rental"
        });

    } finally {
        client.release();
    }
};

module.exports = {
    createRental
};