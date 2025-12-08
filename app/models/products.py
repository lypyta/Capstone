from sqlalchemy import Column, Integer, String, ForeignKey, Float, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.connection import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    nombre = Column(String, nullable=False)
    codigo_sku = Column(String, unique=True)
    descripcion = Column(String)

    categoria_id = Column(Integer, ForeignKey("categories.id"))
    categoria = relationship("Category")

    precio_venta = Column(Float)
    unidad_medida = Column(String)
    es_servicio = Column(Boolean, default=False)
    estado = Column(Boolean, default=True)

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
