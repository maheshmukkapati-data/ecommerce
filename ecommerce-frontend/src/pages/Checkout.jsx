import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState({});
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // 🔹 Load cart + products
  useEffect(() => {
    const loadData = async () => {
      const cartRes = await api.get("/cart/");
      const prodRes = await api.get("/products/");

      const map = {};
      prodRes.data.forEach((p) => (map[p.id] = p));

      setProducts(map);
      setCart(cartRes.data);
    };

    loadData();
  }, []);

  const placeOrder = async () => {
    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    await api.post(`/orders/place/?address=${address}`);
    alert("Order placed successfully");
    navigate("/orders");
  };

  const total = cart.reduce((sum, c) => {
    const price = products[c.product_id]?.price || 0;
    return sum + price * c.quantity;
  }, 0);

  return (
    <div>
      <h2>Checkout</h2>

      {/* ================= ORDER ITEMS ================= */}
      {cart.map((c) => {
        const p = products[c.product_id];

        return (
          <div
            key={c.id}
            style={{
              display: "flex",
              gap: "10px",
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <img
              src={`http://127.0.0.1:8000/uploads/${p?.image}`}
              alt={p?.name}
              width="80"
              height="80"
              style={{ objectFit: "cover" }}
            />

            <div>
              <b>{p?.name}</b>
              <br />
              Price: ${p?.price}
              <br />
              Qty: {c.quantity}
              <br />
              Subtotal: ${p?.price * c.quantity}
            </div>
          </div>
        );
      })}

      {/* ================= TOTAL ================= */}
      <h3>Total: ${total}</h3>

      {/* ================= ADDRESS ================= */}
      <textarea
        placeholder="Enter delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        rows="4"
        style={{ width: "100%", marginTop: "10px" }}
      />

      {/* ================= PLACE ORDER ================= */}
      <button
        onClick={placeOrder}
        style={{ marginTop: "15px", padding: "10px" }}
      >
        Place Order
      </button>
    </div>
  );
}
