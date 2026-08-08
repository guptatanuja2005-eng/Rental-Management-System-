import { Link } from "react-router-dom";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  return (
    <div className="flex justify-between px-8 py-4 bg-white shadow">
      <h1 className="text-xl font-bold text-blue-600">Rental App</h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/rentals">Rentals</Link>
        <Link to="/admin/dashboard">Admin</Link>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}