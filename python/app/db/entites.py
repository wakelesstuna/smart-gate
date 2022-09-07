from uuid import uuid4
from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType
from app.db.database import Base


class NumberPlate(Base):
    __tablename__ = "numberPlates"

    id = Column(UUIDType(binary=False),
                primary_key=True,
                default=uuid4,
                index=True)
    numberPlate = Column(String, unique=True, index=True)

    users = relationship("User", back_populates="numberPlate")


class User(Base):
    __tablename__ = "users"

    id = Column(UUIDType(binary=False),
                primary_key=True,
                default=uuid4,
                index=True)
    name = Column(String, index=True)
    numberPlateId = Column(UUIDType(binary=False),
                           ForeignKey("numberPlates.id"))

    numberPlate = relationship("NumberPlate", back_populates="users")

    def __str__(self) -> str:
        return f"ID: {self.id}\n Name: {self.name}\n PLateID: {self.numberPlateId}"
