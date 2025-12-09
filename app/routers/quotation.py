from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.connection import SessionLocal
from app.schemas.quotation import QuotationCreate, QuotationResponse
from app.services.quotation_service import (
    create_quotation, get_quotations, get_quotation
)

router = APIRouter(prefix="/quotations", tags=["Cotizaciones"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=QuotationResponse)
def create(data: QuotationCreate, db: Session = Depends(get_db)):
    quotation = create_quotation(db, data)
    return quotation


@router.get("/", response_model=list[QuotationResponse])
def list_all(db: Session = Depends(get_db)):
    return get_quotations(db)


@router.get("/{quotation_id}", response_model=QuotationResponse)
def get_one(quotation_id: int, db: Session = Depends(get_db)):
    quotation = get_quotation(db, quotation_id)
    if not quotation:
        raise HTTPException(404, "Cotización no encontrada")
    return quotation
