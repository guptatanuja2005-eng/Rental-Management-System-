import { useEffect, useState } from "react";
import API from "../../services/api";

function Dashboard() {
  const [data, setData] = useState({
    users: 0,
    products: 0,
    rentals: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">📊 Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Users */}
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-lg text-gray-500">Users</h2>
          <p className="text-3xl font-bold text-blue-500">
            {data.users}
          </p>
        </div>

        {/* Products */}
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-lg text-gray-500">Products</h2>
          <p className="text-3xl font-bold text-green-500">
            {data.products}
          </p>
        </div>

        {/* Rentals */}
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-lg text-gray-500">Rentals</h2>
          <p className="text-3xl font-bold text-purple-500">
            {data.rentals}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;