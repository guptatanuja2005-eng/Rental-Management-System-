import { useEffect, useState } from "react";
import API from "../../services/api";

function Rentals() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    API.get("/rentals").then((res) => {
      setRentals(res.data);
    });
  }, []);

  return (
    <div className="p-10">
      <h1>My Rentals</h1>

      {rentals.map((r) => (
        <div key={r._id} className="border p-2 my-2">
          <p>Product: {r.productId?.name}</p>
          <p>Status: {r.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Rentals;