from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.connection import Base

class ProjectCost(Base):
    __tablename__ = "project_costs"

    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    project = relationship("Project")

    tipo_costo = Column(String)
    monto = Column(Float)
    fecha = Column(DateTime, server_default=func.now())
    referencia = Column(String)

    created_at = Column(DateTime, server_default=func.now())
