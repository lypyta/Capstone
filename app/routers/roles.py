from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.connection import SessionLocal
from app.schemas.roles import (
    RoleCreate, RoleUpdate, RoleResponse,
    PermissionCreate, PermissionResponse,
    AssignPermission, AssignRole
)
from app.services.role_service import (
    create_role, get_roles, update_role,
    create_permission, get_permissions,
    assign_permission_to_role, assign_role_to_user
)

router = APIRouter(prefix="/roles", tags=["Roles y Permisos"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# CRUD ROLES -----------------------
@router.post("/", response_model=RoleResponse)
def create(data: RoleCreate, db: Session = Depends(get_db)):
    return create_role(db, data)


@router.get("/", response_model=list[RoleResponse])
def list_roles(db: Session = Depends(get_db)):
    return get_roles(db)


@router.put("/{role_id}", response_model=RoleResponse)
def update(role_id: int, data: RoleUpdate, db: Session = Depends(get_db)):
    updated = update_role(db, role_id, data)
    if not updated:
        raise HTTPException(404, "Rol no encontrado")
    return updated


# CRUD PERMISOS -----------------------
@router.post("/permissions", response_model=PermissionResponse)
def create_perm(data: PermissionCreate, db: Session = Depends(get_db)):
    return create_permission(db, data)


@router.get("/permissions", response_model=list[PermissionResponse])
def list_permissions(db: Session = Depends(get_db)):
    return get_permissions(db)


# ASIGNACIÓN --------------------------
@router.post("/assign-permission")
def assign_permission(data: AssignPermission, db: Session = Depends(get_db)):
    return assign_permission_to_role(db, data.role_id, data.permission_id)


@router.post("/assign-role")
def assign_role(data: AssignRole, db: Session = Depends(get_db)):
    return assign_role_to_user(db, data.user_id, data.role_id)
