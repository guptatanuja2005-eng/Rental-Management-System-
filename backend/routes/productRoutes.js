const express = require("express");

const {
    getProducts
} = require("../controllers/productController");

const {
    authenticateToken
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/",
    authenticateToken,
    getProducts
);

module.exports = router;