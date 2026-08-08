import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// AUTH
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// USER
import Home from "./pages/user/Home";
import Products from "./pages/user/Products";
import Rentals from "./pages/user/Rentals";
import Cart from "./pages/user/Cart";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";

// ADMIN
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminRentals from "./pages/admin/Rentals";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* USER */}
        <Route path="/products" element={<Products />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/rentals" element={<AdminRentals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;