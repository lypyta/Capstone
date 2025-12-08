from sqlalchemy import Column, Integer, Float, ForeignKey, String
from sqlalchemy.orm import relationship
from app.connection import Base

class QuotationItem(Base):
    __tablename__ = "quotation_items"

    id = Column(Integer, primary_key=True)
    quotation_id = Column(Integer, ForeignKey("quotations.id"))
    quotation = relationship("Quotation")

    product_id = Column(Integer, ForeignKey("products.id"))
    product = relationship("Product")

    cantidad = Column(Float)
    precio_unitario = Column(Float)
    subtotal = Column(Float)
    descripcion_item = Column(String)
