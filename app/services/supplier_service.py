from sqlalchemy.orm import Session
from app.models.suppliers import Supplier
from app.schemas.supplier import SupplierCreate, SupplierUpdate


def create_supplier(db: Session, data: SupplierCreate):
    exists = db.query(Supplier).filter(Supplier.rut == data.rut).first()
    if exists:
        return None

    sup = Supplier(**data.dict())
    db.add(sup)
    db.commit()
    db.refresh(sup)
    return sup


def get_all_suppliers(db: Session):
    return db.query(Supplier).all()


def get_supplier(db: Session, supplier_id: int):
    return db.query(Supplier).filter(Supplier.id == supplier_id).first()


def update_supplier(db: Session, supplier_id: int, data: SupplierUpdate):
    sup = get_supplier(db, supplier_id)
    if not sup:
        return None

    for field, value in data.dict(exclude_unset=True).items():
        setattr(sup, field, value)

    db.commit()
    db.refresh(sup)
    return sup


def disable_supplier(db: Session, supplier_id: int):
    sup = get_supplier(db, supplier_id)
    if not sup:
        return None

    sup.estado = False
    db.commit()
    return sup
