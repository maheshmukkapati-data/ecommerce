from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Order, Cart
from ..dependencies import get_current_user

router = APIRouter(prefix="/orders", tags=["Orders"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/place/")
def place_order(
    address: str,
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    order = Order(
        user_id=user.id,
        status="PLACED",
        address=address
    )
    db.add(order)

    db.query(Cart).filter(Cart.user_id == user.id).delete()
    db.commit()

    return {"message": "Order placed"}


@router.get("/")
def my_orders(user=Depends(get_current_user), db: Session = Depends(get_db)):
    if user.role == "admin":
        # ✅ Admin sees ALL orders
        return db.query(Order).all()
    else:
        # ✅ User sees only their orders
        return db.query(Order).filter(Order.user_id == user.id).all()
