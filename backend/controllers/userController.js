const { mockUsers } = require("../db/mockDb");

const getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Admin access required"
            });
        }

        if (process.env.USE_MOCK_DB === "true") {
            return res.json(mockUsers);
        }

        return res.status(501).json({
            message: "User database endpoint not configured yet"
        });

    } catch (error) {
        console.error("Get users error:", error);

        res.status(500).json({
            message: "Failed to fetch users"
        });
    }
};

module.exports = {
    getAllUsers
};