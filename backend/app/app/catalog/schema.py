from datetime import datetime
from pydantic import BaseModel



class CatalogBase(BaseModel):
    departureDate : datetime
    departureAirportCode : str
    departureAirportName : str
    departureCity : str
    departureLocale : str
    arrivalDate : datetime
    arrivalAirportCode : str
    arrivalAirportName : str
    arrivalCity : str
    arrivalLocale : str
    ticketPrice : int
    ticketCurrency : str
    flightNumber : int
    seatCapacity : int

class CatalogCreate(CatalogBase):
    pass

class CatalogUpdate(CatalogBase):
    pass

class CatalogInDBBase(CatalogBase):
    id : int
    class Config:
        orm_mode = True

class Catalog(CatalogInDBBase):
    pass


class CatalogInDB(CatalogInDBBase):
    pass
    