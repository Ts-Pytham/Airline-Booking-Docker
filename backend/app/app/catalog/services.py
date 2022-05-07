from typing import List
from fastapi import HTTPException
from sqlalchemy.orm import Session
import datetime
from app.catalog.models import Flight
from app.booking.models import Booking
from . import schema

async def get_all_catalogs(departureAirportCode : str, arrivalAirportCode : str, departureDate : datetime.datetime, db_session : Session) -> List[Flight]: 
    flights = db_session.query(Flight).filter(Flight.departureAirportCode == departureAirportCode, Flight.arrivalAirportCode == arrivalAirportCode, Flight.departureDate == departureDate).all()
    return flights


async def get_catalog_by_airportCode(airportCode : str, departureDate: datetime.datetime, db_session : Session) -> List[Flight]:
    return db_session.query(Flight).filter(Flight.departureAirportCode == airportCode, Flight.departureDate == departureDate).all()

async def create_catalog(flight_in: schema.CatalogCreate, db_session : Session) -> Flight:
    flight = Flight(**flight_in.dict())
    db_session.add(flight)
    db_session.commit()
    db_session.refresh(flight)
    return flight

async def update_catalog(id: int, flight_in: schema.CatalogUpdate, db_session : Session) -> Flight:
    flight = db_session.query(Flight).filter(Flight.id == id).first()
    if not flight:
        return None
    
    db_session.query(Flight).filter(Flight.id == id).update({
        Flight.departureDate : flight_in.departureDate,
        Flight.departureAirportCode : flight_in.departureAirportCode,
        Flight.departureAirportName : flight_in.departureAirportName,
        Flight.departureCity : flight_in.departureCity,
        Flight.departureLocale : flight_in.departureLocale,
        Flight.arrivalDate : flight_in.arrivalDate,
        Flight.arrivalAirportCode : flight_in.arrivalAirportCode,
        Flight.arrivalAirportName : flight_in.arrivalAirportName,
        Flight.arrivalCity : flight_in.arrivalCity,
        Flight.arrivalLocale : flight_in.arrivalLocale,
        Flight.ticketPrice : flight_in.ticketPrice,
        Flight.ticketCurrency : flight_in.ticketCurrency,
        Flight.flightNumber : flight_in.flightNumber,
        Flight.seatCapacity :flight_in.seatCapacity
    }, synchronize_session=False)

    db_session.commit()

    return flight

async def delete_catalog(id: int, db_session : Session) -> Flight:
    flight = db_session.query(Flight).filter(Flight.id == id).first()
    if not flight:
        return None

    booking = db_session.query(Booking).filter(Booking.outboundFlightId == id).all()
    if booking:
        for b in booking:
            db_session.delete(b)
    
    db_session.delete(flight)
    db_session.commit()
    return flight
