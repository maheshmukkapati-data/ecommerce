import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Home.css";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔁 Redirect admin to admin page
  useEffect(() => {
    if (token && role === "admin") {
      navigate("/admin");
    }
  }, [token, role, navigate]);

  // 🔹 Load products
  useEffect(() => {
    api.get("/products/").then((res) => setProducts(res.data));
  }, []);

  // 🔹 Load cart count
  const loadCartCount = async () => {
    if (!token) return;
    const res = await api.get("/cart/");
    setCartCount(res.data.length);
  };

  useEffect(() => {
    loadCartCount();
  }, [token]);

  // 🔹 Add to cart
  const addToCart = async (id) => {
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }
    await api.post("/cart/", { product_id: id, quantity: 1 });
    loadCartCount(); // refresh cart count
    alert("Added to cart");
  };

    return (
    <div className="home-container">
      {/* HEADER */}
      <div className="home-header">
        <h2>Products</h2>

        {token && role !== "admin" && (
          <div className="cart-icon" onClick={() => navigate("/cart")}>
            🛒
            <span className="cart-badge">{cartCount}</span>
          </div>
        )}
      </div>

      {/* AUTH */}
      {!token && (
        <div className="auth-buttons">
          <Link to="/login"><button>Login</button></Link>
          <Link to="/register"><button>Register</button></Link>
        </div>
      )}

      {/* PRODUCTS */}
      {role !== "admin" && (
        <div className="product-grid">
          {products.map((p) => (
            <div className="product-card" key={p.id}>
              <img
                src={`http://127.0.0.1:8000/uploads/${p.image}`}
                alt={p.name}
              />
              <div className="product-name">{p.name}</div>
              <div className="product-price">${p.price}</div>

              {token && (
                <button
                  className="add-cart-btn"
                  onClick={() => addToCart(p.id)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
