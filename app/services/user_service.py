from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.models.users import User
from app.schemas.users import UserCreate, UserUpdate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


# ----------------- CREATE -----------------
def create_user(db: Session, data: UserCreate):
    hashed = get_password_hash(data.password)
    user = User(
        nombre=data.nombre,
        email=data.email,
        password_hash=hashed,
        telefono=data.telefono,
        role_id=data.role_id,
        estado=True
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


# ----------------- READ -----------------
def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_all_users(db: Session):
    return db.query(User).all()


# ----------------- UPDATE -----------------
def update_user(db: Session, user_id: int, data: UserUpdate):
    user = get_user(db, user_id)
    if not user:
        return None

    if data.nombre is not None:
        user.nombre = data.nombre
    if data.telefono is not None:
        user.telefono = data.telefono
    if data.role_id is not None:
        user.role_id = data.role_id
    if data.estado is not None:
        user.estado = data.estado

    db.commit()
    db.refresh(user)
    return user


# ----------------- DELETE / SOFT DELETE -----------------
def disable_user(db: Session, user_id: int):
    user = get_user(db, user_id)
    if not user:
        return None

    user.estado = False
    db.commit()
    return user
