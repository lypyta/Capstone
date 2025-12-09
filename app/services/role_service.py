from sqlalchemy.orm import Session
from app.models.roles import Role
from app.models.permissions import Permission
from app.models.role_permissions import RolePermission
from app.models.user_roles import UserRole
from app.schemas.roles import RoleCreate, RoleUpdate, PermissionCreate


# ROLES --------------------------
def create_role(db: Session, data: RoleCreate):
    role = Role(name=data.name, description=data.description)
    db.add(role)
    db.commit()
    db.refresh(role)
    return role


def get_roles(db: Session):
    return db.query(Role).all()


def update_role(db: Session, role_id: int, data: RoleUpdate):
    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        return None

    if data.name is not None:
        role.name = data.name
    if data.description is not None:
        role.description = data.description

    db.commit()
    db.refresh(role)
    return role


# PERMISOS --------------------------
def create_permission(db: Session, data: PermissionCreate):
    perm = Permission(codigo=data.codigo, descripcion=data.descripcion)
    db.add(perm)
    db.commit()
    db.refresh(perm)
    return perm


def get_permissions(db: Session):
    return db.query(Permission).all()


# ASIGNACIÓN PERMISOS A ROLES -------
def assign_permission_to_role(db: Session, role_id: int, permission_id: int):
    relation = RolePermission(role_id=role_id, permission_id=permission_id)
    db.add(relation)
    db.commit()
    return {"message": "Permiso asignado al rol"}


# ASIGNACIÓN ROLES A USUARIOS -------
def assign_role_to_user(db: Session, user_id: int, role_id: int):
    user_role = UserRole(user_id=user_id, role_id=role_id)
    db.add(user_role)
    db.commit()
    return {"message": "Rol asignado al usuario"}
