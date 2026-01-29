import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    const res = await api.post("/auth/login", data);

    localStorage.setItem("token", res.data.access_token);

    const payload = JSON.parse(atob(res.data.access_token.split(".")[1]));
    localStorage.setItem("role", payload.role);

    if (payload.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Login to continue shopping</p>

        <form onSubmit={submit} className="login-form">
          <input name="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />
          <button className="login-btn">Login</button>
        </form>

        <div className="login-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
