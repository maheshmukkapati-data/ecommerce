import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState({});
  const navigate = useNavigate();

  // 🔹 Load cart + products
  useEffect(() => {
    const loadData = async () => {
      const cartRes = await api.get("/cart/");
      const productsRes = await api.get("/products/");

      // create product lookup map
      const productMap = {};
      productsRes.data.forEach((p) => {
        productMap[p.id] = p;
      });

      setProducts(productMap);
      setCart(cartRes.data);
    };

    loadData();
  }, []);

  const remove = async (id) => {
    await api.delete(`/cart/${id}`);
    setCart(cart.filter((i) => i.id !== id));
  };

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div>
      <h2>Cart</h2>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((c) => {
        const product = products[c.product_id];

        return (
          <div
            key={c.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <img
  src={`http://127.0.0.1:8000/uploads/${product.image}`}
  alt={product?.name}
  style={{ width: "80px", height: "80px" }}
/>
            <b>Product:</b> {product?.name || "Loading..."}
            <br />
            <b>Price:</b> ${product?.price || 0}
            <br />
            <b>Quantity:</b> {c.quantity}
            <br />
            <b>Subtotal:</b> $
            {(product?.price || 0) * c.quantity}
            <br />

            <button onClick={() => remove(c.id)}>Remove</button>
          </div>
        );
      })}

      {/* 💳 CHECKOUT BUTTON */}
      {cart.length > 0 && (
        <button
          onClick={goToCheckout}
          style={{
            marginTop: "20px",
            padding: "10px",
            fontSize: "16px",
          }}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}
