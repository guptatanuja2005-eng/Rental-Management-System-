import { useEffect, useState } from "react";
import API from "../../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Products</h1>

      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="border p-4">
            <h2>{p.name}</h2>
            <p>₹{p.price}</p>

            <button
              className="bg-blue-500 text-white px-2 py-1 mt-2"
              onClick={() => {
                localStorage.setItem("cart", JSON.stringify(p));
                alert("Added to cart");
              }}
            >
              Rent
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;