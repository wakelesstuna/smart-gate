from http.client import BAD_REQUEST
from typing import List
from uuid import UUID, uuid4
from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from app.api.models import NumberPlateCreate
import app.db.entites as entites


def get_all(db: Session):
    return db.query(entites.NumberPlate).options(joinedload(entites.User.__tablename__)).all()


def save(numberPlate: NumberPlateCreate, db: Session):
    id = uuid4()
    newUsers: List[entites.User] = []
    for user in numberPlate.users:
        newUser = entites.User(name=user.name, numberPlateId=id)
        newUsers.append(newUser)
    db.add_all(newUsers)
    db.commit()

    newNumberPlate = entites.NumberPlate(id=id,
                                         numberPlate=numberPlate.numberPlate,
                                         users=newUsers)
    db.add(newNumberPlate)
    db.commit()
    db.refresh(newNumberPlate)
    return newNumberPlate


def delete(plateId: UUID, db: Session):
    numberPlateToDelete = db.query(entites.NumberPlate).filter(
        entites.NumberPlate.id == plateId).first()

    if numberPlateToDelete is None:
        raise HTTPException(status_code=BAD_REQUEST,
                            detail=f"ID {plateId} : Does not exist.")

    db.delete(numberPlateToDelete)
    db.commit()
