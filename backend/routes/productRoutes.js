const express = require("express");

const {
    getProducts,
    createProduct
} = require("../controllers/productController");

const {
    authenticateToken
} = require("../middleware/authMiddleware");

const {
    requireAdmin
} = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
    "/",
    authenticateToken,
    getProducts
);

router.post(
    "/",
    authenticateToken,
    requireAdmin,
    createProduct
);

module.exports = router;