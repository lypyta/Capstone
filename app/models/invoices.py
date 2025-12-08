from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.connection import Base

class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True)
    proveedor_id = Column(Integer, ForeignKey("suppliers.id"), nullable=True)
    proveedor = relationship("Supplier")

    numero = Column(String, unique=True)
    fecha = Column(DateTime, server_default=func.now())

    subtotal = Column(Float)
    iva = Column(Float)
    total = Column(Float)
    estado = Column(String, default="pendiente")

    created_at = Column(DateTime, server_default=func.now())
