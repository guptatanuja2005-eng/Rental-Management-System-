require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

const pool = require("./db/db");

pool.query("SELECT NOW()", (err, result) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Database connected:", result.rows[0]);
    }
});

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Rental Management System API is running"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});