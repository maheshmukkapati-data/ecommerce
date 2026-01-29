E-Commerce Frontend (React + Vite)

This is the frontend application for the FastAPI E-Commerce backend.
Built using React + Vite + Axios, fully integrated with JWT authentication, admin dashboard, order tracking, and cart system.

🧰 TECH STACK

React (Vite)

Axios

React Hooks

JWT Authentication

FastAPI Backend

📁 PROJECT STRUCTURE
src/
├── api/
│   └── axios.js
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Admin.jsx
│   └── Orders.jsx
├── App.jsx
└── main.jsx

⚙️ SETUP & RUN
npm create vite@latest ecommerce-frontend
cd ecommerce-frontend
npm install
npm install axios react-router-dom
npm run dev


Frontend runs at:

http://localhost:5173
Admin Flow


Register as Admin
|
Login as Admin
|
redirected To Admin page
|
Add products Or Update Order Status



User flow


Register as user 
|
Login As User
|
Home
↓
View Products
|
Add to Cart
↓
Cart
↓
Proceed to Checkout
↓
Place Order
↓
Orders page (auto redirect)
↓
Track Order Status
