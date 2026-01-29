from pydantic import BaseModel

class RegisterSchema(BaseModel):
    email: str
    password: str
    role: str

class LoginSchema(BaseModel):
    email: str
    password: str

class ProductSchema(BaseModel):
    name: str
    price: float
    image: str

class CartSchema(BaseModel):
    product_id: int
    quantity: int

class AddressSchema(BaseModel):
    address: str

class OrderStatusSchema(BaseModel):
    status: str
