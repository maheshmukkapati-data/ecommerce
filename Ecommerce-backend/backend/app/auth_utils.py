from passlib.context import CryptContext
from jose import jwt

SECRET_KEY = "secret123"
ALGORITHM = "HS256"

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    return pwd.hash(password[:72])

def verify_password(plain_password, hashed_password):
    return pwd.verify(plain_password[:72], hashed_password)


def create_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
