from sqlalchemy import Column, Integer, Float, ForeignKey, String
from sqlalchemy.orm import relationship
from app.connection import Base

class InvoiceItem(Base):
    __tablename__ = "invoice_items"

    id = Column(Integer, primary_key=True)
    invoice_id = Column(Integer, ForeignKey("invoices.id"))
    invoice = relationship("Invoice")

    product_id = Column(Integer, ForeignKey("products.id"))
    product = relationship("Product")

    cantidad = Column(Float)
    precio_unitario = Column(Float)
    subtotal = Column(Float)
    descripcion_item = Column(String)
