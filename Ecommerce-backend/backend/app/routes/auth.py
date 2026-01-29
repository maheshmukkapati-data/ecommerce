from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import User
from ..schemas import RegisterSchema, LoginSchema
from ..auth_utils import hash_password, verify_password, create_token

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(data: RegisterSchema, db: Session = Depends(get_db)):
    user = User(
        email=data.email,
        password=hash_password(data.password),
        role=data.role
    )
    db.add(user)
    db.commit()
    return {"message": "User registered"}

@router.post("/login")
def login(data: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password):
        raise HTTPException(status_code=401)
    token = create_token({"id": user.id, "role": user.role})
    return {"access_token": token}
