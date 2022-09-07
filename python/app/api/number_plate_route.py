from http.client import CREATED, NO_CONTENT, OK
from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends
from . import models
from sqlalchemy.orm import Session
from app.db.database import get_session
import app.service.number_plate_service as numberPlateService

number_plate_router = APIRouter()


@number_plate_router.get("/all", status_code=OK, response_model=List[models.NumberPlate])
async def get_all_plates(db: Session = Depends(get_session)):
    return numberPlateService.get_all(db)


@number_plate_router.post("/", status_code=CREATED)
async def create_number_plate(numberPlate: models.NumberPlateCreate, db: Session = Depends(get_session)):
    return numberPlateService.save(numberPlate, db)


@number_plate_router.delete("/{numberPlateId}", status_code=NO_CONTENT)
async def delete_number_plate(numberPlateId: UUID, db: Session = Depends(get_session)):
    return numberPlateService.delete(numberPlateId, db)
