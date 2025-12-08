from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from app.connection import Base

class Automation(Base):
    __tablename__ = "automations"

    id = Column(Integer, primary_key=True)
    nombre = Column(String)
    descripcion = Column(String)
    expresion_cron = Column(String)
    ultima_ejecucion = Column(DateTime)
    activa = Column(Boolean, default=True)

    created_at = Column(DateTime, server_default=func.now())
