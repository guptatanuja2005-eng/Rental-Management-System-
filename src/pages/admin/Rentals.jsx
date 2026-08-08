import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminRentals() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const res = await API.get("/rentals");
      setRentals(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 update rental status
  const updateStatus = async (id, action) => {
    try {
      await API.put(`/rentals/${id}/${action}`);
      fetchRentals();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🛠️ Manage Rentals</h1>

      <div className="grid gap-5">
        {rentals.map((r) => (
          <div
            key={r._id}
            className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">
                {r.productId?.name}
              </h2>
              <p className="text-gray-500">
                Status:{" "}
                <span className="font-semibold text-blue-600">
                  {r.status}
                </span>
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(r._id, "confirm")}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Confirm
              </button>

              <button
                onClick={() => updateStatus(r._id, "pickup")}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Pickup
              </button>

              <button
                onClick={() => updateStatus(r._id, "return")}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Return
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminRentals;