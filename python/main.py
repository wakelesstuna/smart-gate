from http.client import OK
from fastapi import FastAPI
from api.relay import relay_route
import uvicorn

api = FastAPI()
api.include_router(relay_route, prefix="/v1/relay")


@api.get("/", status_code=OK, tags=["root"])
def root():
    return {"application": "demo-api", "status": "up"}


uvicorn.run(api, host="0.0.0.0")
