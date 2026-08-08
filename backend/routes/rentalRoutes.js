const express = require("express");

const {
    createRental,
    getMyRentals,
    returnRental
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

router.get(
    "/my",
    authenticateToken,
    getMyRentals
);

router.put(
    "/:id/return",
    authenticateToken,
    returnRental
);

module.exports = router;