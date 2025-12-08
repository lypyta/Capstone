from sqlalchemy import Column, Integer, Float, ForeignKey, String
from sqlalchemy.orm import relationship
from app.connection import Base

class PurchaseOrderItem(Base):
    __tablename__ = "purchase_order_items"

    id = Column(Integer, primary_key=True)
    orden_compra_id = Column(Integer, ForeignKey("purchase_orders.id"))
    orden_compra = relationship("PurchaseOrder")

    product_id = Column(Integer, ForeignKey("products.id"))
    product = relationship("Product")

    cantidad = Column(Float)
    precio_unitario = Column(Float)
    subtotal = Column(Float)
    descripcion_item = Column(String)
