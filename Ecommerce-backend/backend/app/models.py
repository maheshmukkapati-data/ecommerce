from sqlalchemy import Column, Integer, String, Float, ForeignKey
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(String)
    role = Column(String)   # admin / user
    address = Column(String, nullable=True)

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    price = Column(Float)
    image = Column(String) 

class Cart(Base):
    __tablename__ = "cart"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    product_id = Column(Integer)
    quantity = Column(Integer)

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    status = Column(String)
    address = Column(String)   

