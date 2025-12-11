from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class InvoiceItemCreate(BaseModel):
    product_id: int
    cantidad: float
    precio_unitario: float
    descripcion_item: Optional[str] = None


class InvoiceCreate(BaseModel):
    proveedor_id: Optional[int] = None
    observaciones: Optional[str] = None
    items: List[InvoiceItemCreate]


class InvoiceItemResponse(BaseModel):
    id: int
    product_id: int
    cantidad: float
    precio_unitario: float
    subtotal: float
    descripcion_item: Optional[str]

    class Config:
        orm_mode = True


class InvoiceResponse(BaseModel):
    id: int
    numero: str
    fecha: datetime
    proveedor_id: Optional[int]
    subtotal: float
    iva: float
    total: float
    estado: str
    observaciones: Optional[str]

    class Config:
        from_attributes = True
