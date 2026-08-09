const express = require("express");

const {
    getDashboardStats
} = require("../controllers/dashboardController");

const {
    authenticateToken
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
    "/",
    authenticateToken,
    getDashboardStats
);

module.exports = router;