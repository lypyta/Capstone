from sqlalchemy import Column, Integer, ForeignKey, DateTime, Float, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.connection import Base

class Quotation(Base):
    __tablename__ = "quotations"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)

    fecha = Column(DateTime, server_default=func.now())
    neto = Column(Float, default=0)
    iva = Column(Float, default=0)
    total = Column(Float, default=0)

    observaciones = Column(String)
    estado = Column(String, default="BORRADOR")

    items = relationship("QuotationItem", back_populates="quotation", cascade="all, delete-orphan")
