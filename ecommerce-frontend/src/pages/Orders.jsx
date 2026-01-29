import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  // 🔹 Load user's orders
  useEffect(() => {
    api.get("/orders/").then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders placed yet</p>}

      {orders.map((o) => (
        <div
          key={o.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <b>Order ID:</b> {o.id} <br />
          <b>Status:</b>{" "}
          <span style={{ fontWeight: "bold" }}>{o.status}</span>

          {/* Optional status visualization */}
          <div style={{ marginTop: "6px" }}>
            {o.status === "PLACED" && "🕒 Order placed"}
            {o.status === "SHIPPED" && "📦 Shipped"}
            {o.status === "OUT_FOR_DELIVERY" && "🚚 Out for delivery"}
            {o.status === "DELIVERED" && "✅ Delivered"}
          </div>
        </div>
      ))}
    </div>
  );
}
