from http.client import CREATED, NO_CONTENT, OK
from typing import List
from uuid import UUID
from fastapi import APIRouter
from app.api.models import NumberPlate
import app.service.numberplate as number_plate_serivce

number_plate = APIRouter()


@number_plate.get("/", status_code=OK, response_model=List[NumberPlate])
async def get_all_plates():
    return number_plate_serivce.get_all()


@number_plate.post("/", status_code=CREATED, response_model=NumberPlate)
async def create_number_plate(number_plate: NumberPlate):
    return number_plate_serivce.save(number_plate=number_plate)


@number_plate.delete("/", status_code=NO_CONTENT)
async def delete_number_plate(number_plate_id: UUID):
    return number_plate_serivce.delete(number_plate_id)
