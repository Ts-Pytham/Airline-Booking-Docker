from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from app.database.session import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, autoincrement=True)
    status = Column(String(50))
    outboundFlightId = Column(Integer, ForeignKey("flights.id", ondelete="CASCADE"), ) #Unchecked
    flight = relationship("Flight", back_populates="booking")
    paymentToken = Column(String(50))
    checkedIn = Column(Boolean)
    customerId = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), ) #Unchecked
    customer = relationship("User", back_populates="bookings")
    createdAt = Column(DateTime)
    bookingReference = Column(String(50))
    



