from sqlalchemy.orm import Session
from app.models.products import Product
from app.schemas.products import ProductCreate, ProductUpdate


def create_product(db: Session, data: ProductCreate):
    product = Product(**data.dict())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def get_all_products(db: Session):
    return db.query(Product).all()


def get_product(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()


def update_product(db: Session, product_id: int, data: ProductUpdate):
    product = get_product(db, product_id)
    if not product:
        return None

    for field, value in data.dict(exclude_unset=True).items():
        setattr(product, field, value)

    db.commit()
    db.refresh(product)
    return product


def disable_product(db: Session, product_id: int):
    product = get_product(db, product_id)
    if not product:
        return None

    product.estado = False
    db.commit()
    return product
