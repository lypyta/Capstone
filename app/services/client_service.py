from sqlalchemy.orm import Session
from app.models.clients import Client
from app.schemas.client import ClientCreate, ClientUpdate


def create_client(db: Session, data: ClientCreate):
    exists = db.query(Client).filter(Client.rut == data.rut).first()
    if exists:
        return None

    client = Client(**data.dict())
    db.add(client)
    db.commit()
    db.refresh(client)
    return client


def get_all_clients(db: Session):
    return db.query(Client).all()


def get_client(db: Session, client_id: int):
    return db.query(Client).filter(Client.id == client_id).first()


def update_client(db: Session, client_id: int, data: ClientUpdate):
    client = get_client(db, client_id)
    if not client:
        return None

    for field, value in data.dict(exclude_unset=True).items():
        setattr(client, field, value)

    db.commit()
    db.refresh(client)
    return client


def disable_client(db: Session, client_id: int):
    client = get_client(db, client_id)
    if not client:
        return None

    client.estado = False
    db.commit()
    return client

