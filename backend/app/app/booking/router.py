from fastapi import APIRouter, FastAPI, Depends, status, Response, HTTPException
from sqlalchemy.orm import Session
from typing import Any, List
from app.core import security
from app.database import db
from . import schema
from . import services
from . import validator
from app.catalog import validator as validator_catalog
from app.user import validator as validator_user
from app.user import schema as user_schema

api_router = APIRouter(tags = ["booking"])


@api_router.get('/booking/{id}', response_model = schema.Booking)
async def get_booking_by_id(id: int, db_session : Session = Depends(db.get_db)):
    booking = await services.get_booking_by_id(id, db_session)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    return booking

@api_router.get('/booking/', response_model=List[schema.Booking])
async def get_all_bookings(db_session : Session = Depends(db.get_db), customerName : str = None, status : schema.BookingStatus = None):
    if customerName is not None and not await validator_user.verify_username_exist(customerName, db_session):
        raise HTTPException(status_code=404, detail="User not found")

    bookings = await services.get_all_bookings(db_session=db_session, customerName=customerName, status=status)
    
    if not bookings:
        raise HTTPException(status_code=404, detail="Bookings not found")

    return bookings

@api_router.post('/booking/flight/{idFlight}/user/{idUser}', response_model = schema.Booking, status_code = status.HTTP_201_CREATED)
async def create_booking(idFlight: int, idUser: int, booking_in : schema.BookingCreate, db_session : Session = Depends(db.get_db),
                        current_user :user_schema.User = Depends(security.get_current_user)):
    if not await validator_catalog.verify_flight_exist(idFlight, db_session):
        raise HTTPException(status_code=404, detail="Flight not found")

    if not await validator_user.verify_user_exist(idUser, db_session):
        raise HTTPException(status_code=404, detail="User not found")

    if await validator.verify_booking_exist(booking_in.bookingReference, db_session):
        raise HTTPException(status_code=400, detail="Booking already exists")

    booking = await services.create_booking(idFlight=idFlight, idUser=idUser, booking_in=booking_in, db_session=db_session)

    return booking

@api_router.delete('/booking/{id}', response_model = schema.Booking, status_code = status.HTTP_200_OK)
async def delete_booking(id: int, db_session : Session = Depends(db.get_db),
                        current_user :user_schema.User = Depends(security.get_current_user)):
    booking = await services.delete_booking(id, db_session)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

