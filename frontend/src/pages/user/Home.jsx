import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center h-[80vh] px-6">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Rent Anything, Anytime 🚀
        </h1>

        <p className="text-gray-600 text-lg max-w-xl">
          Your one-stop platform to rent products easily. Fast, secure, and reliable.
        </p>

        <div className="mt-6 flex gap-4">
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Explore Products
          </Link>

          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100"
          >
            Login
          </Link>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="px-10 py-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-6 shadow rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">⚡ Fast Booking</h3>
            <p className="text-gray-500">
              Rent products instantly with a smooth process.
            </p>
          </div>

          <div className="p-6 shadow rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">🔒 Secure Payments</h3>
            <p className="text-gray-500">
              Your transactions are safe and protected.
            </p>
          </div>

          <div className="p-6 shadow rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">📦 Wide Range</h3>
            <p className="text-gray-500">
              Choose from a variety of rental products.
            </p>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-gray-900 text-white text-center py-4 mt-10">
        <p>© 2026 Rental App. All rights reserved.</p>
      </div>
    </div>
  );
}