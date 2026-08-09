const express = require("express");

const {
    mockPayment
} = require("../controllers/paymentController");

const {
    authenticateToken
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
    "/mock",
    authenticateToken,
    mockPayment
);

module.exports = router;