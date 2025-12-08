from sqlalchemy import Column, Integer, String
from app.connection import Base

class Permission(Base):
    __tablename__ = "permissions"

    id = Column(Integer, primary_key=True)
    codigo = Column(String, unique=True)
    descripcion = Column(String)
