
from sqlalchemy.orm import Session

from .models import Booking

async def verify_booking_exist(booking_reference: str, db_session: Session) -> bool:
    return db_session.query(Booking).filter(Booking.bookingReference == booking_reference).first() is not None