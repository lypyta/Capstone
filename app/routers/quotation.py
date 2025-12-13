from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.connection import SessionLocal
from app.schemas.quotation import QuotationCreate, QuotationResponse
from app.services.quotation_service import create_quotation

router = APIRouter(prefix="/quotations", tags=["Cotizaciones"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=QuotationResponse)
def create(data: QuotationCreate, db: Session = Depends(get_db)):
    return create_quotation(db, data)
