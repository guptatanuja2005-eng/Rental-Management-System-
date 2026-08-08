import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    let user = null;

    try {
        user = JSON.parse(
            localStorage.getItem("user") || "null"
        );
    } catch {
        user = null;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-600"
                >
                    RentalMS
                </Link>

                <div className="flex items-center gap-6">

                    <Link
                        to="/"
                        className="font-medium text-slate-600 hover:text-blue-600"
                    >
                        Home
                    </Link>

                    <Link
                        to="/products"
                        className="font-medium text-slate-600 hover:text-blue-600"
                    >
                        Products
                    </Link>

                    {token && (
                        <Link
                            to="/rentals"
                            className="font-medium text-slate-600 hover:text-blue-600"
                        >
                            My Rentals
                        </Link>
                    )}

                    {token && user?.role === "admin" && (
                        <Link
                            to="/admin/dashboard"
                            className="font-medium text-slate-600 hover:text-blue-600"
                        >
                            Admin
                        </Link>
                    )}

                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                        >
                            Login
                        </Link>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;