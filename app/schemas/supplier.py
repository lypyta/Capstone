from pydantic import BaseModel
from typing import Optional


class SupplierCreate(BaseModel):
    nombre: str
    razon_social: Optional[str] = None
    giro: Optional[str] = None
    rut: str
    contacto: Optional[str] = None
    email: Optional[str] = None
    telefono: Optional[str] = None
    direccion: Optional[str] = None
    region: Optional[str] = None
    comuna: Optional[str] = None
    condicion_pago: Optional[str] = None
    insumo_provee: Optional[str] = None
    notas: Optional[str] = None


class SupplierUpdate(BaseModel):
    nombre: Optional[str] = None
    contacto: Optional[str] = None
    telefono: Optional[str] = None
    email: Optional[str] = None
    direccion: Optional[str] = None
    region: Optional[str] = None
    comuna: Optional[str] = None
    condicion_pago: Optional[str] = None
    insumo_provee: Optional[str] = None
    notas: Optional[str] = None
    estado: Optional[bool] = None


class SupplierResponse(BaseModel):
    id: int
    nombre: str
    rut: str
    email: Optional[str]
    telefono: Optional[str]
    estado: bool

    class Config:
        orm_mode = True
