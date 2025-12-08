from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.connection import Base

class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    token = Column(String)
    ip = Column(String)
    dispositivo = Column(String)
    fecha_inicio = Column(DateTime, server_default=func.now())
    fecha_fin = Column(DateTime)
