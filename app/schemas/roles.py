from pydantic import BaseModel
from typing import Optional


class RoleCreate(BaseModel):
    name: str
    description: Optional[str] = None


class RoleUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None


class RoleResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]

    class Config:
        orm_mode = True


class PermissionCreate(BaseModel):
    codigo: str
    descripcion: Optional[str] = None


class PermissionResponse(BaseModel):
    id: int
    codigo: str
    descripcion: Optional[str]

    class Config:
        orm_mode = True


class AssignPermission(BaseModel):
    role_id: int
    permission_id: int


class AssignRole(BaseModel):
    user_id: int
    role_id: int
