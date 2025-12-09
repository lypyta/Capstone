from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.connection import SessionLocal
from app.schemas.users import UserCreate, UserUpdate, UserResponse
from app.services.user_service import (
    create_user, get_all_users, get_user, update_user, disable_user
)

router = APIRouter(prefix="/users", tags=["Usuarios"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Crear usuario
@router.post("/", response_model=UserResponse)
def create(data: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, data)


# Listar usuarios
@router.get("/", response_model=list[UserResponse])
def list_users(db: Session = Depends(get_db)):
    return get_all_users(db)


# Obtener usuario por ID
@router.get("/{user_id}", response_model=UserResponse)
def get(user_id: int, db: Session = Depends(get_db)):
    user = get_user(db, user_id)
    if not user:
        raise HTTPException(404, "Usuario no encontrado")
    return user


# Actualizar usuario
@router.put("/{user_id}", response_model=UserResponse)
def update(user_id: int, data: UserUpdate, db: Session = Depends(get_db)):
    updated = update_user(db, user_id, data)
    if not updated:
        raise HTTPException(404, "Usuario no encontrado")
    return updated


# Desactivar usuario
@router.delete("/{user_id}")
def delete(user_id: int, db: Session = Depends(get_db)):
    deleted = disable_user(db, user_id)
    if not deleted:
        raise HTTPException(404, "Usuario no encontrado")
    return {"message": "Usuario desactivado"}
