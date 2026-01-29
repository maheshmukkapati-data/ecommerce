import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [cartCount, setCartCount] = useState(0);

  // 🔹 Load cart count (user only)
  const loadCartCount = async () => {
    if (token && role === "user") {
      const res = await api.get("/cart/");
      setCartCount(res.data.length);
    }
  };

  useEffect(() => {
    loadCartCount();
  }, [token]);

  // 🔹 Logout
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        background: "#111827",
        color: "white",
      }}
    >
      {/* 🔷 BRAND */}
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Ecomm
      </h2>

      {/* 🔷 LINKS */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {!token && (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}

        {token && role === "user" && (
          <>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/orders" style={linkStyle}>Orders</Link>

            

            <button onClick={logout} style={btnStyle}>
              Logout
            </button>
          </>
        )}

        {token && role === "admin" && (
          <>
            <Link to="/admin" style={linkStyle}>Admin</Link>
            <button onClick={logout} style={btnStyle}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
};

const btnStyle = {
  background: "#ef4444",
  border: "none",
  padding: "6px 12px",
  color: "white",
  cursor: "pointer",
  borderRadius: "4px",
};
