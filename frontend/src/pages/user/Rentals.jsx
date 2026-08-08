import { useEffect, useState } from "react";
import API from "../../services/api";

function Rentals() {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [returningId, setReturningId] = useState(null);

    const fetchRentals = async () => {
        try {
            setError("");

            const response =
                await API.get("/rentals/my");

            setRentals(response.data);

        } catch (error) {
            console.error(
                "Failed to fetch rentals:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Could not load your rentals."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRentals();
    }, []);

    const handleReturn = async (rentalId) => {
        const confirmed = window.confirm(
            "Are you sure you want to return this rental?"
        );

        if (!confirmed) {
            return;
        }

        setReturningId(rentalId);
        setError("");

        try {
            await API.put(
                `/rentals/${rentalId}/return`
            );

            await fetchRentals();

        } catch (error) {
            console.error(
                "Return rental error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Could not return rental."
            );
        } finally {
            setReturningId(null);
        }
    };

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

            <div className="mx-auto max-w-5xl">

                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Account
                </p>

                <h1 className="mt-2 text-4xl font-bold">
                    My Rentals
                </h1>

                <p className="mt-3 text-slate-600">
                    Track your current and previous rentals.
                </p>

                {error && (
                    <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
                        {error}
                    </div>
                )}

                {rentals.length === 0 ? (
                    <div className="mt-8 rounded-xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">

                        <div className="text-5xl">
                            📦
                        </div>

                        <h2 className="mt-4 text-xl font-bold">
                            No rentals yet
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Your rental history will appear here.
                        </p>

                    </div>
                ) : (
                    <div className="mt-8 space-y-5">

                        {rentals.map((rental) => (

                            <div
                                key={rental.id}
                                className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
                            >

                                <div className="flex flex-col justify-between gap-4 md:flex-row">

                                    <div>

                                        <div className="flex items-center gap-3">

                                            <h2 className="text-xl font-bold">
                                                {rental.product_name ||
                                                    `Rental #${rental.id}`}
                                            </h2>

                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                rental.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-slate-100 text-slate-600"
                                            }`}>
                                                {rental.status}
                                            </span>

                                        </div>

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
                                                Return:{" "}
                                                <strong>
                                                    {rental.end_date}
                                                </strong>
                                            </p>

                                        </div>

                                    </div>

                                    <div className="text-left md:text-right">

                                        <p className="text-sm text-slate-500">
                                            Rental amount
                                        </p>

                                        <p className="text-2xl font-bold text-blue-600">
                                            ₹{rental.rental_amount}
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Deposit: ₹
                                            {rental.deposit_amount}
                                        </p>

                                    </div>

                                </div>

                                {rental.status === "active" && (
                                    <button
                                        onClick={() =>
                                            handleReturn(
                                                rental.id
                                            )
                                        }
                                        disabled={
                                            returningId ===
                                            rental.id
                                        }
                                        className="mt-6 rounded-lg bg-slate-900 px-5 py-2.5 font-semibold text-white hover:bg-slate-700 disabled:bg-slate-400"
                                    >
                                        {returningId ===
                                        rental.id
                                            ? "Returning..."
                                            : "Return Product"}
                                    </button>
                                )}

                                {rental.status === "returned" && (
                                    <p className="mt-5 font-semibold text-green-600">
                                        ✓ Product returned
                                    </p>
                                )}

                            </div>

                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default Rentals;