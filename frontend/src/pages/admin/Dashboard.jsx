import { Link } from "react-router-dom";

function Dashboard() {
    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-12">

            <div className="mx-auto max-w-6xl">

                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Administration
                </p>

                <h1 className="mt-2 text-4xl font-bold">
                    Admin Dashboard
                </h1>

                <p className="mt-3 text-slate-600">
                    Welcome back{user?.name ? `, ${user.name}` : ""}.
                    Manage products and rental activity.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-2">

                    <Link
                        to="/admin/products"
                        className="group rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
                    >

                        <div className="text-4xl">
                            📦
                        </div>

                        <h2 className="mt-5 text-2xl font-bold">
                            Product Inventory
                        </h2>

                        <p className="mt-3 text-slate-500">
                            View available products,
                            quantities and rental prices.
                        </p>

                        <p className="mt-6 font-semibold text-blue-600 group-hover:text-blue-700">
                            Manage inventory →
                        </p>

                    </Link>

                    <Link
                        to="/admin/rentals"
                        className="group rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
                    >

                        <div className="text-4xl">
                            📋
                        </div>

                        <h2 className="mt-5 text-2xl font-bold">
                            Rental Activity
                        </h2>

                        <p className="mt-3 text-slate-500">
                            Monitor rental information and
                            current rental status.
                        </p>

                        <p className="mt-6 font-semibold text-blue-600 group-hover:text-blue-700">
                            View rentals →
                        </p>

                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;