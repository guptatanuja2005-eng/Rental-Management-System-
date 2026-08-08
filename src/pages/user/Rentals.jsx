import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Rentals() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/rentals").then(res => setData(res.data));
  }, []);

  return (
    <div className="p-6">
      {data.length === 0 && <p>No rentals 😢</p>}

      {data.map(r => (
        <div key={r._id} className="border p-3 mt-2">
          {r.product?.name} - {r.status}
        </div>
      ))}
    </div>
  );
}