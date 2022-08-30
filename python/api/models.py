from typing import List
from pydantic import BaseModel


class User(BaseModel):
    name: str


class LicensePlate(BaseModel):
    license_plate: str
    users: List[User]


class GateResponse(BaseModel):
    message: str
    open: bool
