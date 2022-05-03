from fastapi import FastAPI
from app.booking import router as booking_router
from app.user import router as user_router
from app.catalog import router as catalog_router
from app.database import models
from app.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Airline Booking", version = "1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
async def home():
    return {"message": "Welcome to Airline Booking"}

app.include_router(booking_router.api_router)
app.include_router(user_router.api_router)
app.include_router(catalog_router.api_router)
app.include_router(auth_router.api_router)
