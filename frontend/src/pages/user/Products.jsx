import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function Products() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await API.get("/products");

                setProducts(response.data);
            } catch (error) {
                console.error(
                    "Failed to fetch products:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Could not load products."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-6 py-16">
                <p className="text-slate-500">
                    Loading products...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-12">

            <div className="mx-auto max-w-7xl">

                <div className="mb-10">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Inventory
                    </p>

                    <h1 className="mt-2 text-4xl font-bold">
                        Available Products
                    </h1>

                    <p className="mt-3 text-slate-600">
                        Browse equipment available for rental.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
                        {error}
                    </div>
                )}

                {products.length === 0 ? (
                    <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                        <p className="text-slate-500">
                            No products available.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {products.map((product) => (

                            <div
                                key={product.id}
                                className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
                            >

                                <div className="flex h-36 items-center justify-center bg-blue-50 text-5xl">
                                    📦
                                </div>

                                <div className="p-6">

                                    <div className="flex items-start justify-between gap-3">

                                        <h2 className="text-xl font-bold">
                                            {product.name}
                                        </h2>

                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                            {product.category}
                                        </span>

                                    </div>

                                    <p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">
                                        {product.description}
                                    </p>

                                    <div className="mt-5 space-y-2 border-t border-slate-100 pt-5">

                                        <p className="text-2xl font-bold text-blue-600">
                                            ₹{product.price_per_day}
                                            <span className="text-sm font-normal text-slate-500">
                                                {" "}/ day
                                            </span>
                                        </p>

                                        <p className="text-sm text-slate-600">
                                            Security deposit: ₹
                                            {product.security_deposit}
                                        </p>

                                        <p className="text-sm text-slate-600">
                                            Available:{" "}
                                            {product.available_quantity}
                                        </p>

                                    </div>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/booking?productId=${product.id}`
                                            )
                                        }
                                        disabled={
                                            product.available_quantity <= 0
                                        }
                                        className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                                    >
                                        {product.available_quantity > 0
                                            ? "Rent Now"
                                            : "Out of Stock"}
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default Products;