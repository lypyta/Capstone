from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.connection import SessionLocal
from app.schemas.products import ProductCreate, ProductUpdate, ProductResponse
from app.services.product_services import (
    create_product, get_all_products, get_product,
    update_product, disable_product
)

router = APIRouter(prefix="/products", tags=["Products"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=ProductResponse)
def create(data: ProductCreate, db: Session = Depends(get_db)):
    product = create_product(db, data)
    return product


@router.get("/", response_model=list[ProductResponse])
def list_all(db: Session = Depends(get_db)):
    return get_all_products(db)


@router.get("/{product_id}", response_model=ProductResponse)
def get_one(product_id: int, db: Session = Depends(get_db)):
    prod = get_product(db, product_id)
    if not prod:
        raise HTTPException(404, "Producto no existe")
    return prod


@router.put("/{product_id}", response_model=ProductResponse)
def update(product_id: int, data: ProductUpdate, db: Session = Depends(get_db)):
    prod = update_product(db, product_id, data)
    if not prod:
        raise HTTPException(404, "Producto no existe")
    return prod


@router.delete("/{product_id}")
def disable(product_id: int, db: Session = Depends(get_db)):
    prod = disable_product(db, product_id)
    if not prod:
        raise HTTPException(404, "Producto no existe")
    return {"message": "Producto desactivado"}
