from http.client import BAD_REQUEST
from typing import List
from uuid import UUID
from sqlalchemy.orm import Session, joinedload
from fastapi import Depends, HTTPException
from app.db.models import NumberPlate, User
from app.db.database import get_session


def get_all(db: Session = Depends(get_session)):
    return db.query(NumberPlate).options(joinedload(User)).all()


def save(number_plate: NumberPlate, db: Session = Depends(get_session)):
    users: List[User] = []
    for user in number_plate.users:
        user_model = User(name=user.name)
        users.append(user_model)
    db.add_all(users)
    db.commit()

    number_plate_model = NumberPlate(
        number_plate=number_plate.number_plate, users=users)
    db.add(number_plate_model)
    db.commit()
    db.refresh(number_plate_model)
    return number_plate_model


def delete(plate_id: UUID, db: Session = Depends(get_session)):
    number_plate_to_delete = db.query(NumberPlate).filter(
        NumberPlate.id == plate_id).first()

    if number_plate_to_delete is None:
        raise HTTPException(status_code=BAD_REQUEST,
                            detail=f"ID {plate_id} : Does not exist.")

    db.delete(number_plate_to_delete)
    # db.query(NumberPlate).filter(
    #   NumberPlate.id == plate_id).delete()
    db.commit()
