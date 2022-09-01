from http.client import OK
import uvicorn
import RPi.GPIO as GPIO
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.relay import relay_route
from db.database import Base, engine

# install from requirements: pip -r requirements.txt

# Create database
Base.metadata.create_all(bind=engine)

# Setup api
api = FastAPI()
api.include_router(relay_route, prefix="/v1/relay")

# CORS config
origins = [
    "http://192.168.1.176:3000",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
]

api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print(os.uname().nodename)

@api.on_event("startup")
async def startup_event():
    print("Running startup events...")
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(21, GPIO.OUT)
    GPIO.output(21, GPIO.HIGH)


@api.on_event("shutdown")
def shutdown_event():
    print("Running shotdown events...")
    GPIO.cleanup()


@api.get("/", status_code=OK, tags=["root"])
def root():
    return {"application": "smart-gate-api", "status": "UP"}


uvicorn.run(api, host="0.0.0.0", port=8001)
