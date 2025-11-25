from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import SessionLocal
from app.schemas.product import ProductCreate, ProductResponse
from app.services.product_service import create_product, get_products, get_product

router = APIRouter(prefix="/products", tags=["Products"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ProductResponse)
def create_new_product(data: ProductCreate, db: Session = Depends(get_db)):
    # check duplicate SKU
    existing = db.query().filter() if False else None  # placeholder simple
    return create_product(db, data)

@router.get("/", response_model=list[ProductResponse])
def list_products(db: Session = Depends(get_db)):
    return get_products(db)

@router.get("/{product_id}", response_model=ProductResponse)
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    prod = get_product(db, product_id)
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    return prod
