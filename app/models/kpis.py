from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.connection import Base

class KPI(Base):
    __tablename__ = "kpis"

    id = Column(Integer, primary_key=True)
    codigo = Column(String)
    descripcion = Column(String)
    valor = Column(Float)
    periodo = Column(String)
    fecha_calculo = Column(DateTime, server_default=func.now())
