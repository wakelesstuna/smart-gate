from uuid import uuid4

from sqlalchemy import Column, ForeignKey, String
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType

from app.db.database import Base


class NumberPlate(Base):
    __tablename__ = "number_plate"

    id = Column(UUIDType(binary=False),
                primary_key=True,
                default=uuid4,
                index=True)
    number_plate = Column(String, unique=True, index=True)
    users = relationship("User", back_populates="number_plate")


class User(Base):
    __tablename__ = "user"

    id = Column(UUIDType(binary=False),
                primary_key=True,
                default=uuid4,
                index=True)
    number_plate_id = Column(UUIDType(binary=False),
                             ForeignKey("number_plate.id"))
    name = Column(String, index=True)
    number_plate = relationship("NumberPlate", back_populates="users")
