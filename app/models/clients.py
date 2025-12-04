from sqlalchemy import Column, Integer, String
from app.connection import Base

class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    contact_email = Column(String)
    phone = Column(String)
