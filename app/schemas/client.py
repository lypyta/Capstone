from pydantic import BaseModel, EmailStr
from typing import Optional


class ClientCreate(BaseModel):
    nombre: str
    rut: str
    razon_social: Optional[str] = None
    giro: Optional[str] = None

    contacto: Optional[str] = None
    email: Optional[EmailStr] = None
    telefono: Optional[str] = None

    direccion: Optional[str] = None
    region: Optional[str] = None
    comuna: Optional[str] = None

    condicion_pago: Optional[str] = None
    descuento_default: Optional[float] = 0
    limite_credito: Optional[float] = 0
    notas: Optional[str] = None


class ClientUpdate(BaseModel):
    nombre: Optional[str] = None
    rut: Optional[str] = None
    razon_social: Optional[str] = None
    giro: Optional[str] = None

    contacto: Optional[str] = None
    email: Optional[EmailStr] = None
    telefono: Optional[str] = None

    direccion: Optional[str] = None
    region: Optional[str] = None
    comuna: Optional[str] = None

    condicion_pago: Optional[str] = None
    descuento_default: Optional[float] = None
    limite_credito: Optional[float] = None
    notas: Optional[str] = None
    estado: Optional[bool] = None


class ClientResponse(BaseModel):
    id: int
    nombre: str
    rut: str
    email: Optional[EmailStr] = None
    telefono: Optional[str] = None
    estado: bool

    class Config:
        from_attributes = True  # reemplaza a orm_mode en Pydantic v2
