from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.connection import SessionLocal
from app.schemas.invoice import InvoiceCreate, InvoiceResponse
from app.services.invoice_service import (
    create_invoice, get_invoices, get_invoice
)

router = APIRouter(prefix="/invoices", tags=["Facturas"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=InvoiceResponse)
def create(data: InvoiceCreate, db: Session = Depends(get_db)):
    invoice = create_invoice(db, data)
    return invoice


@router.get("/", response_model=list[InvoiceResponse])
def list_all(db: Session = Depends(get_db)):
    return get_invoices(db)


@router.get("/{invoice_id}", response_model=InvoiceResponse)
def get_one(invoice_id: int, db: Session = Depends(get_db)):
    invoice = get_invoice(db, invoice_id)
    if not invoice:
        raise HTTPException(404, "Factura no encontrada")
    return invoice
