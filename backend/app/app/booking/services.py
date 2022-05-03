from typing import List
from sqlalchemy.orm import Session
from app.booking.models import Booking
from app.user import models as user_models
from . import schema

async def get_booking_by_id(booking_id: int, db_session : Session) -> Booking:
    booking = db_session.query(Booking).get(booking_id)
    return booking

async def get_booking_by_idFlight(idFlight : int, db_session : Session) -> List[Booking]:
    bookings = db_session.query(Booking).filter(Booking.idFlight == idFlight).all()
    return bookings

async def get_all_bookings(db_session : Session, customerName : str, status : schema.BookingStatus) -> List[Booking]:

    if not customerName and not status:
        bookings = db_session.query(Booking).all()

    elif customerName and not status:
        customer = db_session.query(user_models.User).filter(user_models.User.fullname == customerName).first()
        bookings = db_session.query(Booking).filter(Booking.customerId == customer.id).all()
        

    elif not customerName and status:
        bookings = db_session.query(Booking).filter(Booking.status == status).all()
    else:
        customer = db_session.query(user_models.User).filter(user_models.User.fullname == customerName).first()
        bookings = db_session.query(Booking).filter(Booking.customer == customer, Booking.status == status).all()

    return bookings

async def create_booking(idFlight : int, idUser: int, booking_in: schema.BookingCreate, db_session : Session) -> Booking:
    booking = Booking(**booking_in.dict())
    booking.outboundFlightId = idFlight
    booking.customerId = idUser

    db_session.add(booking)
    db_session.commit()
    db_session.refresh(booking)

    booking.id = db_session.query(Booking).filter(Booking.bookingReference == booking.bookingReference).first().id
    return booking

async def delete_booking(booking_id: int, db_session : Session) -> Booking:
    booking = db_session.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        return None
    db_session.delete(booking)
    db_session.commit()
    return booking






