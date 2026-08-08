function Cart() {
  const product = JSON.parse(localStorage.getItem("cart"));

  if (!product) return <h1>No items</h1>;

  return (
    <div className="p-10">
      <h1>Cart</h1>

      <h2>{product.name}</h2>
      <p>₹{product.price}</p>

      <a href="/checkout">
        <button className="bg-green-500 text-white px-4 py-2">
          Checkout
        </button>
      </a>
    </div>
  );
}

export default Cart;