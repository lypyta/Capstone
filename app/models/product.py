from sqlalchemy import Column, Integer, String, Float
from app.database.connection import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String(50), unique=True, index=True)
    name = Column(String(255), nullable=False)
    unit = Column(String(50))
    unit_cost = Column(Float, nullable=False, default=0.0)
    stock = Column(Float, default=0.0)
