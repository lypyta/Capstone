from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class QuotationItemCreate(BaseModel):
    product_id: int
    cantidad: float
    precio_unitario: float
    descripcion_item: Optional[str] = None


class QuotationCreate(BaseModel):
    cliente_id: int
    observaciones: Optional[str] = None
    items: List[QuotationItemCreate]


class QuotationItemResponse(BaseModel):
    id: int
    product_id: int
    cantidad: float
    precio_unitario: float
    subtotal: float
    descripcion_item: Optional[str]

    class Config:
        orm_mode = True


class QuotationResponse(BaseModel):
    id: int
    numero: str
    cliente_id: int
    fecha: datetime
    estado: str
    subtotal: float
    iva: float
    total: float
    observaciones: Optional[str]
    items: List[QuotationItemResponse] = []

    class Config:
        orm_mode = True
