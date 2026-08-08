import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response =
                    await API.get("/products");

                setProducts(response.data);

            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Could not load products."
                );
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) {
        return (
            <div className="px-6 py-16 text-center">
                <p className="text-slate-500">
                    Loading inventory...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-12">

            <div className="mx-auto max-w-7xl">

                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Administration
                </p>

                <h1 className="mt-2 text-4xl font-bold">
                    Product Inventory
                </h1>

                <p className="mt-3 text-slate-600">
                    Monitor equipment availability and pricing.
                </p>

                {error && (
                    <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
                        {error}
                    </div>
                )}

                <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead className="bg-slate-100 text-sm text-slate-600">

                                <tr>

                                    <th className="px-6 py-4">
                                        Product
                                    </th>

                                    <th className="px-6 py-4">
                                        Category
                                    </th>

                                    <th className="px-6 py-4">
                                        Price / Day
                                    </th>

                                    <th className="px-6 py-4">
                                        Total
                                    </th>

                                    <th className="px-6 py-4">
                                        Available
                                    </th>

                                    <th className="px-6 py-4">
                                        Status
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-slate-100">

                                {products.map((product) => (

                                    <tr
                                        key={product.id}
                                        className="hover:bg-slate-50"
                                    >

                                        <td className="px-6 py-5">

                                            <p className="font-semibold">
                                                {product.name}
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                {product.description}
                                            </p>

                                        </td>

                                        <td className="px-6 py-5 text-slate-600">
                                            {product.category}
                                        </td>

                                        <td className="px-6 py-5 font-semibold">
                                            ₹{product.price_per_day}
                                        </td>

                                        <td className="px-6 py-5 text-slate-600">
                                            {product.total_quantity}
                                        </td>

                                        <td className="px-6 py-5 font-semibold">
                                            {product.available_quantity}
                                        </td>

                                        <td className="px-6 py-5">

                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                {product.status}
                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminProducts;