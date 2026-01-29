from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routes import auth, products, cart, orders, admin
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="E-Commerce Backend")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite frontend
    allow_credentials=True,
    allow_methods=["*"],   # allows OPTIONS
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(cart.router)
app.include_router(orders.router)
app.include_router(admin.router)
