from fastapi import FastAPI
from app.connection import Base, engine

# Routers
from app.routers.auth import router as auth_router
from app.routers.products import router as product_router
from app.routers.users import router as users_router
from app.routers.roles import router as roles_router
from app.routers.clients import router as clients_router
from app.routers.suppliers import router as suppliers_router
from app.routers.quotation import router as quotations_router
from app.routers.invoice import router as invoices_router

from fastapi.middleware.cors import CORSMiddleware

# Crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI(title="ERP Cloud - Base", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# REGISTRO CORRECTO DE ROUTERS
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(product_router, prefix="/products", tags=["Products"])
app.include_router(users_router, prefix="/users", tags=["Users"])
app.include_router(roles_router, prefix="/roles", tags=["Roles"])

# 👇 ESTE ES EL CORREGIDO
app.include_router(clients_router)

app.include_router(suppliers_router, prefix="/suppliers", tags=["Suppliers"])
app.include_router(quotations_router, prefix="/quotations", tags=["Quotations"])
app.include_router(invoices_router, prefix="/invoices", tags=["Invoices"])

@app.get("/")
def root():
    return {"message": "ERP Cloud iniciado correctamente"}
