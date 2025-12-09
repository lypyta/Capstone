from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.connection import SessionLocal
from app.schemas.client import ClientCreate, ClientUpdate, ClientResponse
from app.services.client_service import (
    create_client, get_all_clients, get_client,
    update_client, disable_client
)

router = APIRouter(prefix="/clients", tags=["Clientes"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=ClientResponse)
def create(data: ClientCreate, db: Session = Depends(get_db)):
    client = create_client(db, data)
    if not client:
        raise HTTPException(400, "El RUT ya está registrado")
    return client


@router.get("/", response_model=list[ClientResponse])
def list_clients(db: Session = Depends(get_db)):
    return get_all_clients(db)


@router.get("/{client_id}", response_model=ClientResponse)
def get_one(client_id: int, db: Session = Depends(get_db)):
    client = get_client(db, client_id)
    if not client:
        raise HTTPException(404, "Cliente no existe")
    return client


@router.put("/{client_id}", response_model=ClientResponse)
def update(client_id: int, data: ClientUpdate, db: Session = Depends(get_db)):
    client = update_client(db, client_id, data)
    if not client:
        raise HTTPException(404, "Cliente no existe")
    return client


@router.delete("/{client_id}")
def disable(client_id: int, db: Session = Depends(get_db)):
    client = disable_client(db, client_id)
    if not client:
        raise HTTPException(404, "Cliente no existe")
    return {"message": "Cliente desactivado"}
