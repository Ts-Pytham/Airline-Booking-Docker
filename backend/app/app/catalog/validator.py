from sqlalchemy.orm import Session

from .models import Flight

async def verify_flight_exist(idFlight: int, db_session: Session) -> bool:
    return db_session.query(Flight).filter(Flight.id == idFlight).first() is not None