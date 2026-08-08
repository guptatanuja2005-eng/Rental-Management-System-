import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await API.post(
                "/auth/signup",
                formData
            );

            setSuccess(
                "Account created successfully! Redirecting..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            console.error(
                "Signup error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Signup failed. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-slate-50 px-6 py-12">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">

                <div className="text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                        👤
                    </div>

                    <h1 className="mt-5 text-3xl font-bold">
                        Create Account
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Join the Rental Management System.
                    </p>

                </div>

                {error && (
                    <div className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mt-6 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                        {success}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    <div>

                        <label className="mb-2 block text-sm font-semibold">
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-semibold">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-semibold">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-slate-400"
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-slate-500">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Signup;