import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from http.client import OK

from app.db.database import init_database_and_tabels
from app.settings import ORIGINS, PORT, HOST
from app.api.gate_route import gate_router
from app.api.number_plate_route import number_plate_router
from app.api.camera import camera_router as camera_router
from app.service.gate_service import clean_up_GPIO, init_GPIO

# install from requirements: pip -r requirements.txt

# Setup api
api = FastAPI()
api.include_router(gate_router, prefix="/v1/gate")
api.include_router(number_plate_router, prefix="/v1/number-plate")
api.include_router(camera_router, prefix="/v1/camera")

# CORS config
api.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@api.on_event("startup")
async def startup_event():
    print("Running startup events...")
    init_database_and_tabels()
    init_GPIO()


@api.on_event("shutdown")
def shutdown_event():
    print("Running shotdown events...")
    clean_up_GPIO()


@api.get("/", status_code=OK, tags=["root"])
def root():
    return {"application": "smart-gate-api", "status": "UP"}


uvicorn.run(api, host=HOST, port=PORT)
