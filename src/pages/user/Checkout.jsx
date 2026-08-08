import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const product = JSON.parse(localStorage.getItem("cart"));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  const handleCheckout = async () => {
    await API.post("/rentals", {
      productId: product._id,
      startDate,
      endDate,
    });

    alert("Rental created");
    navigate("/rentals");
  };

  return (
    <div className="p-10">
      <h1>Checkout</h1>

      <input
        type="date"
        onChange={(e) => setStartDate(e.target.value)}
      />

      <input
        type="date"
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button
        onClick={handleCheckout}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Confirm Rental
      </button>
    </div>
  );
}

export default Checkout;