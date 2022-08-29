from http.client import OK
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.relay import relay_route
import uvicorn

api = FastAPI()
api.include_router(relay_route, prefix="/v1/relay")


# CORS config
origins = [
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


@api.get("/", status_code=OK, tags=["root"])
def root():
    return {"application": "demo-api", "status": "up"}


uvicorn.run(api, host="0.0.0.0")
