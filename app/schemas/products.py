from pydantic import BaseModel
from typing import Optional


class ProductCreate(BaseModel):
    nombre: str
    codigo_sku: Optional[str] = None
    descripcion: Optional[str] = None

    categoria_id: Optional[int] = None
    precio_venta: Optional[float] = 0
    unidad_medida: Optional[str] = None
    es_servicio: Optional[bool] = False


class ProductUpdate(BaseModel):
    nombre: Optional[str] = None
    codigo_sku: Optional[str] = None
    descripcion: Optional[str] = None

    categoria_id: Optional[int] = None
    precio_venta: Optional[float] = None
    unidad_medida: Optional[str] = None
    es_servicio: Optional[bool] = None
    estado: Optional[bool] = None


class ProductResponse(BaseModel):
    id: int
    nombre: str
    codigo_sku: Optional[str]
    descripcion: Optional[str]
    categoria_id: Optional[int]
    precio_venta: Optional[float]
    unidad_medida: Optional[str]
    es_servicio: bool
    estado: bool

    class Config:
        from_attributes = True  # ORM Mode en Pydantic v2
