const express = require("express");

const {
    getAllUsers
} = require("../controllers/userController");

const {
    authenticateToken
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
    "/",
    authenticateToken,
    getAllUsers
);

module.exports = router;