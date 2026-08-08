import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminRentals() {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadRentals = async () => {
            try {
                const response =
                    await API.get("/rentals/my");

                setRentals(response.data);

            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Could not load rentals."
                );
            } finally {
                setLoading(false);
            }
        };

        loadRentals();
    }, []);

    if (loading) {
        return (
            <div className="px-6 py-16 text-center">
                <p className="text-slate-500">
                    Loading rentals...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-12">

            <div className="mx-auto max-w-6xl">

                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Administration
                </p>

                <h1 className="mt-2 text-4xl font-bold">
                    Rental Activity
                </h1>

                <p className="mt-3 text-slate-600">
                    Monitor rental records and their current status.
                </p>

                {error && (
                    <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
                        {error}
                    </div>
                )}

                {rentals.length === 0 ? (
                    <div className="mt-8 rounded-xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">

                        <div className="text-5xl">
                            📋
                        </div>

                        <h2 className="mt-4 text-xl font-bold">
                            No rental activity
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Rental records will appear here.
                        </p>

                    </div>
                ) : (
                    <div className="mt-8 space-y-5">

                        {rentals.map((rental) => (

                            <div
                                key={rental.id}
                                className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
                            >

                                <div className="flex flex-col justify-between gap-5 md:flex-row">

                                    <div>

                                        <h2 className="text-xl font-bold">
                                            {rental.product_name ||
                                                `Rental #${rental.id}`}
                                        </h2>

                                        <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">

                                            <p>
                                                Quantity:{" "}
                                                <strong>
                                                    {rental.quantity}
                                                </strong>
                                            </p>

                                            <p>
                                                Duration:{" "}
                                                <strong>
                                                    {rental.duration} day(s)
                                                </strong>
                                            </p>

                                            <p>
                                                Start:{" "}
                                                <strong>
                                                    {rental.start_date}
                                                </strong>
                                            </p>

                                            <p>
                                                End:{" "}
                                                <strong>
                                                    {rental.end_date}
                                                </strong>
                                            </p>

                                        </div>

                                    </div>

                                    <div>

                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            rental.status === "active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-slate-100 text-slate-600"
                                        }`}>
                                            {rental.status}
                                        </span>

                                        <p className="mt-4 text-2xl font-bold text-blue-600">
                                            ₹{rental.rental_amount}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default AdminRentals;