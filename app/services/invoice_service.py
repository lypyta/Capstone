from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.invoices import Invoice
from app.models.invoice_items import InvoiceItem
from app.schemas.invoice import InvoiceCreate

IVA_PORCENTAJE = 0.19


def generar_numero_factura(db: Session) -> str:
    count = db.query(func.count(Invoice.id)).scalar() or 0
    correlativo = count + 1
    return f"FAC-{correlativo:05d}"


def create_invoice(db: Session, data: InvoiceCreate):
    numero = generar_numero_factura(db)

    invoice = Invoice(
        proveedor_id=data.proveedor_id,
        numero=numero,
        estado="pendiente",
    )
    db.add(invoice)
    db.commit()
    db.refresh(invoice)

    subtotal = 0.0

    for item_data in data.items:
        subtotal_item = item_data.cantidad * item_data.precio_unitario
        subtotal += subtotal_item

        item = InvoiceItem(
            invoice_id=invoice.id,
            product_id=item_data.product_id,
            cantidad=item_data.cantidad,
            precio_unitario=item_data.precio_unitario,
            subtotal=subtotal_item,
            descripcion_item=item_data.descripcion_item,
        )
        db.add(item)

    iva = subtotal * IVA_PORCENTAJE
    total = subtotal + iva

    invoice.subtotal = subtotal
    invoice.iva = iva
    invoice.total = total

    db.commit()
    db.refresh(invoice)

    return invoice


def get_invoices(db: Session):
    return db.query(Invoice).all()


def get_invoice(db: Session, invoice_id: int):
    return db.query(Invoice).filter(Invoice.id == invoice_id).first()
