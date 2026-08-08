
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
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Available Products</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-500 mb-3">₹{p.price}</p>

            <button
              onClick={() => {
                localStorage.setItem("cart", JSON.stringify(p));
                alert("Added to cart");
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600"
            >
              Rent Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;