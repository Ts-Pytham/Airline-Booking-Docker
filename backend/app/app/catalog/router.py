import datetime
from fastapi import APIRouter, FastAPI, Depends, status, Response, HTTPException
from sqlalchemy.orm import Session
from typing import Any, List
from app.database import db
from app.core import security
from . import schema
from . import services
from app.user import schema as user_schema

api_router = APIRouter(tags = ["catalog"])

@api_router.get('/ada/', response_model= List[schema.Catalog])
async def get_ada(db_session : Session = Depends(db.get_db)):
    a = await services.get_all_catalogsa(db_session=db_session)
    if not a:
        raise HTTPException(status_code=404, detail="Catalog not found")
    return a

@api_router.get('/catalog/', response_model= List[schema.Catalog])
async def get_all_catalogs(departureAirportCode : str, arrivalAirportCode : str, departureDate : datetime.datetime, db_session : Session = Depends(db.get_db)):
    catalogs = await services.get_all_catalogs(departureAirportCode=departureAirportCode, arrivalAirportCode=arrivalAirportCode, departureDate=departureDate, db_session=db_session)
    
    if not catalogs:
        raise HTTPException(status_code=404, detail="Catalog not found")
    
    return catalogs

@api_router.get('/catalog/{airportCode}', response_model= List[schema.Catalog])
async def get_catalog_by_airportCode(airportCode : str, departureDate: datetime.datetime,db_session : Session = Depends(db.get_db)):
    catalogs = await services.get_catalog_by_airportCode(airportCode, departureDate, db_session=db_session)
    
    if not catalogs:
        raise HTTPException(status_code=404, detail="Catalog not found")
    
    return catalogs

@api_router.post('/catalog/', response_model= schema.Catalog, status_code = status.HTTP_201_CREATED)
async def create_catalog(flight_in: schema.CatalogCreate, db_session : Session = Depends(db.get_db),
                         current_user :user_schema.User = Depends(security.get_current_user)):
    catalog = await services.create_catalog(flight_in, db_session=db_session)
    return catalog

@api_router.put('/catalog/{id}', response_model= schema.Catalog)
async def update_catalog(id: int, flight_in: schema.CatalogUpdate, db_session : Session = Depends(db.get_db),
                         current_user :user_schema.User = Depends(security.get_current_user)):
    catalog = await services.update_catalog(id, flight_in, db_session=db_session)

    if not catalog:
        raise HTTPException(status_code=404, detail="Catalog not found")

    return catalog

@api_router.delete('/catalog/{id}', response_model= schema.Catalog)
async def delete_catalog(id: int, db_session : Session = Depends(db.get_db),
                        current_user :user_schema.User = Depends(security.get_current_user)):
    catalog = await services.delete_catalog(id, db_session=db_session)

    if not catalog:
        raise HTTPException(status_code=404, detail="Catalog not found")
        
    return catalog