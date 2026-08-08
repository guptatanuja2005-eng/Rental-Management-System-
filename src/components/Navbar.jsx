import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <h1 className="text-xl font-bold text-blue-600">Rental App</h1>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-500">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/rentals">Rentals</Link>

        <Link to="/admin" className="text-purple-600 font-semibold">
          Admin
        </Link>

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

export default Navbar;