from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.connection import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True)
    usuario = Column(String)
    accion = Column(String)
    tabla = Column(String)
    registro_id = Column(Integer)
    detalle = Column(String)
    fecha = Column(DateTime, server_default=func.now())
