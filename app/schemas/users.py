from pydantic import BaseModel
from typing import Optional

# ----- Entrada -----
class UserCreate(BaseModel):
    nombre: str
    email: str
    password: str
    telefono: Optional[str] = None
    role_id: Optional[int] = None


class UserUpdate(BaseModel):
    nombre: Optional[str] = None
    telefono: Optional[str] = None
    role_id: Optional[int] = None
    estado: Optional[bool] = None

# ----- Salida -----
class UserResponse(BaseModel):
    id: int
    nombre: str
    email: str
    telefono: Optional[str]
    role_id: Optional[int]
    estado: bool

    class Config:
        orm_mode = True
