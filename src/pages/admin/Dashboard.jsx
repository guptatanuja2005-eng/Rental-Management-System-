import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/dashboard").then(res => setData(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1>Admin Dashboard</h1>
      <p>Total Rentals: {data.totalRentals}</p>
      <p>Revenue: ₹{data.revenue}</p>
    </div>
  );
}