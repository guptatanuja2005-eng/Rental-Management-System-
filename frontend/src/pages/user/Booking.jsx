import { useEffect, useState } from "react";
import {
    useNavigate,
    useSearchParams
} from "react-router-dom";
import API from "../../services/api";

function Booking() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const productId = searchParams.get("productId");

    const [product, setProduct] = useState(null);

    const [formData, setFormData] = useState({
        quantity: 1,
        startDate: "",
        endDate: ""
    });

    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await API.get("/products");

                const foundProduct = response.data.find(
                    (item) =>
                        Number(item.id) === Number(productId)
                );

                if (!foundProduct) {
                    setError("Product not found.");
                    return;
                }

                setProduct(foundProduct);

            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Could not load product."
                );
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        } else {
            setError("No product selected.");
            setLoading(false);
        }
    }, [productId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const calculateDuration = () => {
        if (
            !formData.startDate ||
            !formData.endDate
        ) {
            return 0;
        }

        const start = new Date(
            `${formData.startDate}T00:00:00`
        );

        const end = new Date(
            `${formData.endDate}T00:00:00`
        );

        const difference = end - start;

        const days = Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );

        return days > 0 ? days : 0;
    };

    const duration = calculateDuration();

    const rentalPrice =
        product && duration > 0
            ? Number(product.price_per_day) *
              duration *
              Number(formData.quantity)
            : 0;

    const securityDeposit =
        product
            ? Number(product.security_deposit) *
              Number(formData.quantity)
            : 0;

    const totalAmount =
        rentalPrice + securityDeposit;

    const handleBooking = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (
            !formData.startDate ||
            !formData.endDate
        ) {
            setError(
                "Please select both dates."
            );
            return;
        }

        if (duration <= 0) {
            setError(
                "Return date must be after the start date."
            );
            return;
        }

        if (
            Number(formData.quantity) >
            product.available_quantity
        ) {
            setError(
                "Not enough products available."
            );
            return;
        }

        setBooking(true);

        try {
            const response = await API.post(
                "/rentals",
                {
                    productId: Number(productId),
                    quantity: Number(
                        formData.quantity
                    ),
                    startDate:
                        formData.startDate,
                    endDate:
                        formData.endDate
                }
            );

            console.log(
                "Rental created:",
                response.data
            );

            setSuccess(
                "Rental confirmed successfully!"
            );

            setTimeout(() => {
                navigate("/rentals");
            }, 1000);

        } catch (error) {
            console.error(
                "Booking error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Could not create rental."
            );

        } finally {
            setBooking(false);
        }
    };

    if (loading) {
        return (
            <div className="px-6 py-16 text-center">
                <p className="text-slate-500">
                    Loading product...
                </p>
            </div>
        );
    }

    if (error && !product) {
        return (
            <div className="mx-auto max-w-xl px-6 py-16 text-center">

                <h2 className="text-2xl font-bold">
                    Booking
                </h2>

                <p className="mt-4 text-red-600">
                    {error}
                </p>

                <button
                    onClick={() =>
                        navigate("/products")
                    }
                    className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                >
                    Back to Products
                </button>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-12">

            <div className="mx-auto max-w-3xl">

                <h1 className="text-4xl font-bold">
                    Confirm Rental
                </h1>

                <p className="mt-2 text-slate-600">
                    Choose your rental dates and quantity.
                </p>

                {error && (
                    <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mt-6 rounded-lg bg-green-50 p-4 text-green-700">
                        {success}
                    </div>
                )}

                <div className="mt-8 rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

                    <div className="mb-8">

                        <div className="flex items-center justify-between">

                            <h2 className="text-2xl font-bold">
                                {product.name}
                            </h2>

                            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                                {product.category}
                            </span>

                        </div>

                        <p className="mt-3 text-slate-600">
                            {product.description}
                        </p>

                        <p className="mt-4 font-semibold text-blue-600">
                            ₹{product.price_per_day} / day
                        </p>

                    </div>

                    <form onSubmit={handleBooking}>

                        <div className="grid gap-6 md:grid-cols-3">

                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Quantity
                                </label>

                                <input
                                    type="number"
                                    name="quantity"
                                    min="1"
                                    max={
                                        product.available_quantity
                                    }
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Return Date
                                </label>

                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                        </div>

                        <div className="mt-8 rounded-xl bg-slate-50 p-6">

                            <h3 className="text-lg font-bold">
                                Rental Summary
                            </h3>

                            <div className="mt-4 space-y-3 text-sm">

                                <div className="flex justify-between">
                                    <span className="text-slate-600">
                                        Duration
                                    </span>

                                    <span className="font-semibold">
                                        {duration} day(s)
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-600">
                                        Rental price
                                    </span>

                                    <span className="font-semibold">
                                        ₹{rentalPrice}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-600">
                                        Security deposit
                                    </span>

                                    <span className="font-semibold">
                                        ₹{securityDeposit}
                                    </span>
                                </div>

                                <div className="border-t border-slate-200 pt-4">
                                    <div className="flex justify-between text-lg">
                                        <span className="font-bold">
                                            Total
                                        </span>

                                        <span className="font-bold text-blue-600">
                                            ₹{totalAmount}
                                        </span>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={booking}
                            className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                        >
                            {booking
                                ? "Confirming..."
                                : "Confirm Rental"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Booking;