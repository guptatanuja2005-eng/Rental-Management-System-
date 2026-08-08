import { useEffect, useState } from "react";
import API from "../../services/api";

export default function AdminRentals() {
  const [data, setData] = useState([]);

  const fetch = () => API.get("/rentals").then(res => setData(res.data));

  useEffect(fetch, []);

  const action = async (id, type) => {
    await API.put(`/rentals/${id}/${type}`);
    fetch();
  };

  return (
    <div className="p-6">
      {data.map(r => (
        <div key={r._id} className="border p-2 mt-2">
          {r.product?.name} - {r.status}

          <button onClick={()=>action(r._id,"confirm")}>Confirm</button>
          <button onClick={()=>action(r._id,"pickup")}>Pickup</button>
          <button onClick={()=>action(r._id,"return")}>Return</button>
        </div>
      ))}
    </div>
  );
}