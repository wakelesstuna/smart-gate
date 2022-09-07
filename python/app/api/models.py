from typing import List
from uuid import UUID
from pydantic import BaseModel


class UserBase(BaseModel):
    name: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: UUID
    numberPlateId: UUID

    class Config:
        orm_mode = True


class NumberPlateBase(BaseModel):
    numberPlate: str


class NumberPlateCreate(NumberPlateBase):
    users: List[UserCreate] = []


class NumberPlate(NumberPlateBase):
    id: UUID
    numberPlate: str
    users: List[User] = []

    class Config:
        orm_mode = True


class GateResponse(BaseModel):
    message: str
    open: bool
