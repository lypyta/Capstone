from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.connection import SessionLocal
from app.schemas.supplier import SupplierCreate, SupplierUpdate, SupplierResponse
from app.services.supplier_service import (
    create_supplier, get_all_suppliers, get_supplier,
    update_supplier, disable_supplier
)

router = APIRouter(prefix="/suppliers", tags=["Proveedores"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=SupplierResponse)
def create(data: SupplierCreate, db: Session = Depends(get_db)):
    supplier = create_supplier(db, data)
    if not supplier:
        raise HTTPException(400, "El RUT ya está registrado")
    return supplier


@router.get("/", response_model=list[SupplierResponse])
def list_all(db: Session = Depends(get_db)):
    return get_all_suppliers(db)


@router.get("/{supplier_id}", response_model=SupplierResponse)
def get_one(supplier_id: int, db: Session = Depends(get_db)):
    sup = get_supplier(db, supplier_id)
    if not sup:
        raise HTTPException(404, "Proveedor no existe")
    return sup


@router.put("/{supplier_id}", response_model=SupplierResponse)
def update(supplier_id: int, data: SupplierUpdate, db: Session = Depends(get_db)):
    sup = update_supplier(db, supplier_id, data)
    if not sup:
        raise HTTPException(404, "Proveedor no existe")
    return sup


@router.delete("/{supplier_id}")
def disable(supplier_id: int, db: Session = Depends(get_db)):
    sup = disable_supplier(db, supplier_id)
    if not sup:
        raise HTTPException(404, "Proveedor no existe")
    return {"message": "Proveedor desactivado"}
