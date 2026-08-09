const { mockRentals } = require("../db/mockDb");

const mockPayment = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            rentalId,
            paymentMethod
        } = req.body;

        if (!rentalId) {
            return res.status(400).json({
                message: "Rental ID is required"
            });
        }

        const rental = mockRentals.find(
            (r) => r.id === Number(rentalId)
        );

        if (!rental) {
            return res.status(404).json({
                message: "Rental not found"
            });
        }

        if (
            rental.user_id !== userId &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }

        if (rental.payment_status === "paid") {
            return res.status(400).json({
                message: "Payment already completed"
            });
        }

        rental.payment_method =
            paymentMethod || "mock";

        rental.payment_status = "paid";

        rental.deposit_status = "held";

        rental.status = "confirmed";

        rental.paid_at = new Date();

        return res.json({
            message: "Mock payment successful",

            payment: {
                rentalId: rental.id,
                rentalAmount: rental.rental_amount,
                securityDeposit: rental.deposit_amount,
                totalPaid:
                    Number(rental.rental_amount) +
                    Number(rental.deposit_amount),
                paymentMethod:
                    rental.payment_method,
                status: "paid"
            },

            rental
        });

    } catch (error) {
        console.error(
            "Mock payment error:",
            error
        );

        res.status(500).json({
            message: "Payment failed"
        });
    }
};

module.exports = {
    mockPayment
};