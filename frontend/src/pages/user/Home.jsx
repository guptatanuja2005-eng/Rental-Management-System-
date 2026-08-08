import { Link } from "react-router-dom";

function Home() {
    const token = localStorage.getItem("token");

    return (
        <div className="min-h-screen bg-slate-50">

            <section className="bg-blue-600 px-6 py-24 text-white">

                <div className="mx-auto max-w-5xl text-center">

                    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-200">
                        Company Equipment Rental
                    </p>

                    <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
                        Rental Management System
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                        Easily rent, manage and return
                        company equipment from one place.
                    </p>

                    <div className="mt-8 flex justify-center gap-4">

                        <Link
                            to="/products"
                            className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 shadow hover:bg-blue-50"
                        >
                            Browse Products
                        </Link>

                        {!token && (
                            <Link
                                to="/login"
                                className="rounded-lg border border-white px-6 py-3 font-semibold text-white hover:bg-blue-700"
                            >
                                Login
                            </Link>
                        )}

                    </div>

                </div>

            </section>

            <section className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">

                <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                    <div className="mb-4 text-3xl">
                        📦
                    </div>

                    <h2 className="text-xl font-bold">
                        Browse
                    </h2>

                    <p className="mt-3 leading-7 text-slate-600">
                        View available company equipment,
                        rental prices and stock.
                    </p>
                </div>

                <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                    <div className="mb-4 text-3xl">
                        🗓️
                    </div>

                    <h2 className="text-xl font-bold">
                        Rent
                    </h2>

                    <p className="mt-3 leading-7 text-slate-600">
                        Select dates and quantity and
                        instantly calculate the rental cost.
                    </p>
                </div>

                <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                    <div className="mb-4 text-3xl">
                        ✓
                    </div>

                    <h2 className="text-xl font-bold">
                        Return
                    </h2>

                    <p className="mt-3 leading-7 text-slate-600">
                        Track your rentals and return
                        equipment when you're finished.
                    </p>
                </div>

            </section>

        </div>
    );
}

export default Home;