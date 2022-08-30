from uuid import uuid4
from sqlalchemy import Column, String, ForeignKey
from database import Base
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType


class LicensePlate(Base):
    __tablename__ = "license_plate"

    id = Column(UUIDType(binary=False),
                primary_key=True,
                default=uuid4,
                index=True)
    license_plate = Column(String, unique=True, index=True)
    users = relationship("User", back_populates="license_plate")


class User(Base):
    __tablename__ = "user"

    id = Column(UUIDType(binary=False),
                primary_key=True,
                default=uuid4,
                index=True)
    license_plate_id = Column(UUIDType(binary=False),
                              ForeignKey("license_plate.id"))
    name = Column(String, index=True)
    license_plate = relationship("LicensePlate", back_populates="users")
