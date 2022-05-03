from typing import List

from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from app.database import db
from app.core import security

from . import schema
from . import services
from . import validator

api_router = APIRouter(tags=['Users'])

@api_router.post('/user/', status_code=status.HTTP_201_CREATED, response_model=schema.User)
async def create_user_registration(user_in: schema.UserCreate, db_session: Session = Depends(db.get_db)):

    user = await validator.verify_username_exist(user_in.username, db_session)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )

    new_user = await services.new_user_register(user_in, db_session)
    return new_user

@api_router.get('/user/', response_model=List[schema.User])
async def get_all_users(db_session: Session = Depends(db.get_db)):
    return await services.all_users(db_session)

@api_router.get('/user/{user_id}', response_model=schema.User)
async def get_user_by_id(user_id: int, db_session: Session = Depends(db.get_db)):
    return await services.get_user_by_id(user_id, db_session)

@api_router.delete('/user/{user_id}', response_model=schema.User)
async def delete_user_by_id(user_id: int, db_session: Session = Depends(db.get_db),
                           current_user :schema.User = Depends(security.get_current_user)):
    user = await services.delete_user_by_id(user_id, db_session)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user

@api_router.put('/user/{user_id}', response_model=schema.User, status_code=status.HTTP_200_OK)
async def update_user(user_id: int, user: schema.UserUpdate, db_session: Session = Depends(db.get_db),
                      current_user :schema.User = Depends(security.get_current_user)):
    user = await services.update_user(user_id, user, db_session)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user