from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.connection import Base

class PurchaseOrder(Base):
    __tablename__ = "purchase_orders"

    id = Column(Integer, primary_key=True)
    proveedor_id = Column(Integer, ForeignKey("suppliers.id"))
    proveedor = relationship("Supplier")

    numero = Column(String, unique=True)
    fecha = Column(DateTime, server_default=func.now())
    estado = Column(String, default="pendiente")

    subtotal = Column(Float)
    iva = Column(Float)
    total = Column(Float)
    observaciones = Column(String)

    created_at = Column(DateTime, server_default=func.now())
