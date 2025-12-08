from sqlalchemy import Column, Integer, String, ForeignKey, Float, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.connection import Base

class Supply(Base):
    __tablename__ = "supplies"

    id = Column(Integer, primary_key=True)
    nombre = Column(String, nullable=False)
    codigo = Column(String, unique=True)
    descripcion = Column(String)

    proveedor_id = Column(Integer, ForeignKey("suppliers.id"))
    proveedor = relationship("Supplier")

    unidad_medida = Column(String)
    costo_actual = Column(Float)
    estado = Column(Boolean, default=True)

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
