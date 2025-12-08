from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.connection import Base

class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    razon_social = Column(String)
    giro = Column(String)
    rut = Column(String, unique=True, nullable=False)

    contacto = Column(String)
    email = Column(String)
    telefono = Column(String)

    direccion = Column(String)
    region = Column(String)
    comuna = Column(String)

    condicion_pago = Column(String)
    tipo_proveedor = Column(String, default="local")
    estado = Column(Boolean, default=True)

    insumo_provee = Column(String)
    dia_de_visita = Column(String)
    notas = Column(String)

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
