from sqlalchemy import Column, Integer, String, ForeignKey
from app.connection import Base

class Dashboard(Base):
    __tablename__ = "dashboards"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    titulo = Column(String)
