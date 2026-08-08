const express = require("express");

const {
    createRental
} = require("../controllers/rentalController");

const {
    authenticateToken
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    authenticateToken,
    createRental
);

module.exports = router;