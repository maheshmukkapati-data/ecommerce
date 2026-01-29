import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Admin.css";
export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
const [editingProduct, setEditingProduct] = useState(null);
const [editName, setEditName] = useState("");
const [editPrice, setEditPrice] = useState("");

  // 🔹 Load existing products
  const loadProducts = async () => {
    const res = await api.get("/products/");
    setProducts(res.data);
  };

  // 🔹 Load all orders
  const loadOrders = async () => {
    const res = await api.get("/orders/");
    setOrders(res.data);
  };

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // 🔹 ADD PRODUCT (MULTIPART FORM DATA)
  const addProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("price", e.target.price.value);
    formData.append("image", e.target.image.files[0]); // 👈 FILE

    await api.post("/products/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Product added successfully");
    e.target.reset();
    loadProducts();
  };

  // 🔹 Update order status
  const updateStatus = async (orderId, status) => {
    await api.put(`/admin/orders/${orderId}`, { status });
    alert("Order status updated");
    loadOrders();
  };
const deleteProduct = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  await api.delete(`/admin/products/${id}`);
  alert("Product deleted");
  loadProducts();
};
const startEdit = (product) => {
  setEditingProduct(product.id);
  setEditName(product.name);
  setEditPrice(product.price);
};

const updateProduct = async (id) => {
  await api.put(`/admin/products/${id}`, {
    name: editName,
    price: editPrice,
  });

  alert("Product updated");
  setEditingProduct(null);
  loadProducts();
};

  return (
  <div className="admin-container">
  <div className="admin-wrapper">

    <div className="admin-header">
      <h2>Admin Dashboard</h2>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>

    {/* PRODUCTS */}
    <div className="admin-section">
      <h3>Products</h3>
      <div className="admin-card">
  {products.map((p) => (
    <div className="product-row" key={p.id}>
      <img
        src={`http://127.0.0.1:8000/uploads/${p.image}`}
        alt={p.name}
      />

      {editingProduct === p.id ? (
        <>
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            type="number"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
          />

          <button onClick={() => updateProduct(p.id)}>Save</button>
          <button onClick={() => setEditingProduct(null)}>Cancel</button>
        </>
      ) : (
        <>
          <span className="product-name">{p.name}</span>
          <span className="product-price">₹{p.price}</span>

          <button onClick={() => startEdit(p)}>Edit</button>
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
        </>
      )}
    </div>
  ))}
</div>

    </div>

    {/* ADD PRODUCT */}
    <div className="admin-section">
      <h3>Add Product</h3>
      <div className="admin-card">
        <form className="admin-form" onSubmit={addProduct}>
          <input name="name" placeholder="Product name" />
          <input name="price" type="number" placeholder="Price" />
          <input name="image" type="file" />
          <button>Add</button>
        </form>
      </div>
    </div>

    {/* ORDERS */}
    <div className="admin-section">
      <h3>Orders</h3>
      {orders.map(o => (
        <div className="order-card" key={o.id}>
          <b>Order #{o.id}</b>
          <span className={`status ${o.status}`}>{o.status}</span>
          <br />
          <b>Address:</b> {o.address}

          <select onChange={(e) => updateStatus(o.id, e.target.value)}>
            <option disabled selected>Update status</option>
            <option value="PLACED">PLACED</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
        </div>
      ))}
    </div>

  </div>
</div>

);
}
