import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      {products.length === 0 && <p>No products 😢</p>}

      {products.map(p => (
        <div key={p._id} className="border p-4 rounded shadow">
          <h2>{p.name}</h2>
          <p>₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}