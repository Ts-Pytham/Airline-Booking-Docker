from typing import List, Optional

from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from . import validator
from . import models
from . import schema
from app.booking.models import Booking
from app.core import hashing

async def new_user_register(user_in: schema.UserCreate, db_session: Session) -> models.User:
    
    new_user = models.User(**user_in.dict())
    db_session.add(new_user)
    db_session.commit()
    db_session.refresh(new_user)
    return new_user

async def all_users(db_session: Session) -> List[models.User]:
    users = db_session.query(models.User).all()
    return users

async def get_user_by_id(user_id: int, db_session: Session) -> Optional[models.User]:
    user_info = await validator.verify_user_exits(user_id, db_session)
    if not user_info:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Data Not Found !")
    return user_info

async def delete_user_by_id(user_id: int, db_session: Session):
    user = await validator.verify_user_exist(user_id, db_session)
    if not user:
        return None

    booking = db_session.query(Booking).filter(Booking.customerId == user_id).all()
    if booking:
        for b in booking:
            db_session.delete(b)

    db_session.delete(user)
    db_session.commit()
    return user

async def update_user(user_id: int, user: schema.UserUpdate, db_session : Session) -> Optional[schema.User]:
    if not await validator.verify_user_exits(user_id, db_session):
        return None
        
    userc = models.User(**user.dict())
    userc.id = user_id
    db_session.query(models.User).filter(models.User.id == user_id).update(
        {
            models.User.fullname : userc.fullname, 
            models.User.password : userc.password,
            models.User.username : userc.username,

        }, synchronize_session=False)
    db_session.commit()
    
    return user

def authenticate(*, username:str, password:str, db:Session) -> Optional[models.User]:
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user or not hashing.verify_password(password, user.password):
        return None
    return user