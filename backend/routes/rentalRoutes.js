const express = require("express");
const router = express.Router();

const { getMyRentals, createRental } = require("../controllers/rentalController");
const { authenticateToken } = require("../middlewares/authMiddleware");

// ✅ GET - My rentals
router.get("/my", authenticateToken, getMyRentals);

// 🔥 ADD THIS - Create rental
router.post("/", authenticateToken, createRental);

module.exports = router;