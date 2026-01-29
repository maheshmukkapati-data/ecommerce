from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Cart
from ..schemas import CartSchema
from ..dependencies import get_current_user

router = APIRouter(prefix="/cart", tags=["Cart"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ➕ ADD ITEM TO CART
@router.post("/")
def add_cart(
    data: CartSchema,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    item = Cart(
        user_id=user.id,
        product_id=data.product_id,
        quantity=data.quantity
    )
    db.add(item)
    db.commit()
    return {"message": "Added to cart"}

# 👀 VIEW CART
@router.get("/")
def view_cart(
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Cart).filter(Cart.user_id == user.id).all()

# ❌ DELETE ITEM FROM CART
@router.delete("/{cart_id}")
def delete_cart_item(
    cart_id: int,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    item = db.query(Cart).filter(
        Cart.id == cart_id,
        Cart.user_id == user.id
    ).first()

    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    db.delete(item)
    db.commit()
    return {"message": "Item removed from cart"}
