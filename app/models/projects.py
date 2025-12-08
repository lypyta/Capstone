from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.connection import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True)
    cliente_id = Column(Integer, ForeignKey("clients.id"))
    cliente = relationship("Client")

    nombre = Column(String, nullable=False)
    descripcion = Column(String)
    fecha_inicio = Column(DateTime)
    fecha_fin = Column(DateTime)
    estado = Column(String, default="activo")

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
