from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.connection import SessionLocal
from app.schemas.auth import TokenResponse
from app.services.auth_service import authenticate_user, create_access_token

router = APIRouter(prefix="/auth", tags=["Autenticación"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Login de usuario con JWT"""
    user = authenticate_user(db, form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas"
        )

    access_token = create_access_token({"sub": str(user.id)})

    return TokenResponse(access_token=access_token)
