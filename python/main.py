from http.client import OK
from fastapi import FastAPI
import uvicorn

api = FastAPI()


@api.get("/", status_code=OK, tags=["root"])
def root():
    return {"application": "demo-api", "status": "up"}


uvicorn.run(api, host="0.0.0.0")
