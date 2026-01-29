from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Product
from ..dependencies import get_current_user
import shutil
import uuid
import os

router = APIRouter(prefix="/products", tags=["Products"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ ADD PRODUCT (ADMIN + IMAGE UPLOAD)
@router.post("/")
def add_product(
    name: str = Form(...),
    price: float = Form(...),
    image: UploadFile = File(...),
    user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admin allowed")

    # ensure uploads folder exists
    os.makedirs("uploads", exist_ok=True)

    # generate unique filename
    filename = f"{uuid.uuid4()}_{image.filename}"
    file_path = f"uploads/{filename}"

    # save image
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    product = Product(
        name=name,
        price=price,
        image=filename
    )
    db.add(product)
    db.commit()

    return {"message": "Product added successfully"}

# ✅ LIST PRODUCTS
@router.get("/")
def list_products(db: Session = Depends(get_db)):
    return db.query(Product).all()
