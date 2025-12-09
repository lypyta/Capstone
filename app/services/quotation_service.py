from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.quotations import Quotation
from app.models.quotation_items import QuotationItem
from app.schemas.quotation import QuotationCreate


IVA_PORCENTAJE = 0.19  # 19% típico en Chile


def generar_numero_cotizacion(db: Session) -> str:
    count = db.query(func.count(Quotation.id)).scalar() or 0
    correlativo = count + 1
    return f"COT-{correlativo:05d}"


def create_quotation(db: Session, data: QuotationCreate):
    numero = generar_numero_cotizacion(db)

    quotation = Quotation(
        cliente_id=data.cliente_id,
        numero=numero,
        estado="pendiente",
        observaciones=data.observaciones,
    )
    db.add(quotation)
    db.commit()
    db.refresh(quotation)

    subtotal = 0.0

    for item_data in data.items:
        subtotal_item = item_data.cantidad * item_data.precio_unitario
        subtotal += subtotal_item

        item = QuotationItem(
            quotation_id=quotation.id,
            product_id=item_data.product_id,
            cantidad=item_data.cantidad,
            precio_unitario=item_data.precio_unitario,
            subtotal=subtotal_item,
            descripcion_item=item_data.descripcion_item,
        )
        db.add(item)

    iva = subtotal * IVA_PORCENTAJE
    total = subtotal + iva

    quotation.subtotal = subtotal
    quotation.iva = iva
    quotation.total = total

    db.commit()
    db.refresh(quotation)

    return quotation


def get_quotations(db: Session):
    return db.query(Quotation).all()


def get_quotation(db: Session, quotation_id: int):
    return db.query(Quotation).filter(Quotation.id == quotation_id).first()
