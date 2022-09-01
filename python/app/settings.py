import os

PORT = os.getenv("PORT", 8001)
HOST = os.getenv("HOST", "localhost")
DATABASE_URI = os.getenv("DATABASE_URI", "sqlite:///sql_app.db")
STATIC_PATH = os.getenv("STATIC_PATH", "static")

ORIGINS = [
    "http://192.168.1.176:3000",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
]
