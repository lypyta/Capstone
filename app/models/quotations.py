from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.connection import Base

class Quotation(Base):
    __tablename__ = "quotations"

    id = Column(Integer, primary_key=True)
    cliente_id = Column(Integer, ForeignKey("clients.id"))
    cliente = relationship("Client")

    numero = Column(String, unique=True)
    fecha = Column(DateTime, server_default=func.now())
    estado = Column(String, default="pendiente")

    subtotal = Column(Float)
    iva = Column(Float)
    total = Column(Float)
    observaciones = Column(String)

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
