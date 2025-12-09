from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.connection import SessionLocal
from app.schemas.product import ProductCreate, ProductResponse
from app.services.product_services import create_product, get_products, get_product
from app.models.products import Product

router = APIRouter(prefix="/products", tags=["Products"])

# Dependencia de DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=ProductResponse)
def create_new_product(data: ProductCreate, db: Session = Depends(get_db)):

    # Validar SKU duplicado
    existing = db.query(Product).filter(Product.sku == data.sku).first()
    if existing:
        raise HTTPException(status_code=400, detail="SKU ya está registrado")

    return create_product(db, data)


@router.get("/", response_model=list[ProductResponse])
def list_products(db: Session = Depends(get_db)):
    return get_products(db)


@router.get("/{product_id}", response_model=ProductResponse)
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    prod = get_product(db, product_id)
    if not prod:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return prod
