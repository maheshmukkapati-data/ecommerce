from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Order, Product
from ..schemas import OrderStatusSchema
from ..dependencies import get_current_user

router = APIRouter(prefix="/admin", tags=["Admin"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ================= UPDATE ORDER STATUS =================
@router.put("/orders/{order_id}")
def update_status(
    order_id: int,
    data: OrderStatusSchema,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    order = db.query(Order).get(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = data.status
    db.commit()

    return {"message": "Status updated"}

# ================= UPDATE PRODUCT =================
@router.put("/products/{product_id}")
def update_product(
    product_id: int,
    data: dict,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    product = db.query(Product).get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    product.name = data.get("name", product.name)
    product.price = data.get("price", product.price)

    db.commit()
    return {"message": "Product updated"}
@router.delete("/products/{product_id}")
def delete_product(
    product_id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin only")

    product = db.query(Product).get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()
    return {"message": "Product deleted"}
