const {
    mockProducts,
    mockRentals
} = require("../db/mockDb");

const getDashboardStats = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Admin access required"
            });
        }

        const activeRentals = mockRentals.filter(
            (rental) =>
                rental.status === "confirmed" ||
                rental.status === "active"
        ).length;

        const overdueRentals = mockRentals.filter(
            (rental) =>
                rental.status === "overdue"
        ).length;

        const returnedRentals = mockRentals.filter(
            (rental) =>
                rental.status === "returned"
        ).length;

        const totalRevenue = mockRentals.reduce(
            (total, rental) =>
                total + Number(rental.rental_amount || 0),
            0
        );

        const securityDepositsHeld =
            mockRentals
                .filter(
                    (rental) =>
                        rental.deposit_status === "held"
                )
                .reduce(
                    (total, rental) =>
                        total +
                        Number(
                            rental.deposit_amount || 0
                        ),
                    0
                );

        const lateFeeCollection =
            mockRentals.reduce(
                (total, rental) =>
                    total +
                    Number(rental.late_fee || 0),
                0
            );

        const totalProducts = mockProducts.reduce(
            (total, product) =>
                total +
                Number(product.total_quantity || 0),
            0
        );

        const availableProducts = mockProducts.reduce(
            (total, product) =>
                total +
                Number(product.available_quantity || 0),
            0
        );

        res.json({
            activeRentals,
            overdueRentals,
            returnedRentals,
            totalRevenue,
            securityDepositsHeld,
            lateFeeCollection,
            totalProducts,
            availableProducts,
            totalRentals: mockRentals.length
        });

    } catch (error) {
        console.error(
            "Dashboard error:",
            error
        );

        res.status(500).json({
            message: "Failed to load dashboard"
        });
    }
};

module.exports = {
    getDashboardStats
};