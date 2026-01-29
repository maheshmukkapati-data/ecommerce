from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from .database import SessionLocal
from .models import User

oauth2 = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2)):
    payload = jwt.decode(token, "secret123", algorithms=["HS256"])
    db = SessionLocal()
    user = db.query(User).get(payload["id"])
    if not user:
        raise HTTPException(status_code=401)
    return user
