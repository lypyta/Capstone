from sqlalchemy.orm import Session
from app.models.quotations import Quotation
from app.models.quotation_items import QuotationItem
from app.schemas.quotation import QuotationCreate

IVA_RATE = 0.19

def create_quotation(db: Session, data: QuotationCreate):
    neto = 0

    quotation = Quotation(
        client_id=data.client_id,
        observaciones=data.observaciones,
        estado="BORRADOR"
    )

    db.add(quotation)
    db.flush()  # 🔑 obtiene quotation.id sin commit

    items_db = []
    for item in data.items:
        subtotal = item.cantidad * item.precio_unitario
        neto += subtotal

        items_db.append(
            QuotationItem(
                quotation_id=quotation.id,
                product_id=item.product_id,
                nombre_producto=item.nombre_producto,
                cantidad=item.cantidad,
                precio_unitario=item.precio_unitario,
                subtotal=subtotal
            )
        )

    iva = round(neto * IVA_RATE, 2)
    total = round(neto + iva, 2)

    quotation.neto = neto
    quotation.iva = iva
    quotation.total = total

    db.add_all(items_db)
    db.commit()
    db.refresh(quotation)

    return quotation
