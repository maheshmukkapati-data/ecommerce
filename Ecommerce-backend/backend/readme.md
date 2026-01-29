E-Commerce Backend – FastAPI

A complete end-to-end e-commerce backend built using FastAPI + SQLite + SQLAlchemy + JWT Authentication, fully testable via Postman and ready for frontend integration.

TECH STACK

FastAPI

SQLite

SQLAlchemy

JWT (python-jose)

Passlib (bcrypt)

Postman (Testing)

HOW TO RUN (FROM SCRATCH)


cd Ecommerce-backend

python -m venv venv

venv\Scripts\activate
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload


Server runs at:

http://127.0.0.1:8000

AUTHENTICATION

JWT Token based

Header format:

Authorization: Bearer <access_token>
